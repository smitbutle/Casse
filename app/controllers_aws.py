
import resource
from app import db
from app import utils
from app import constants
from app.models import User, Functions
from flask import request


from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
import boto3
import os
import zipfile

import dotenv
import uuid



dotenv.load_dotenv()

aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID')
aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
aws_region = os.environ.get('AWS_REGION')

lambda_client = boto3.client('lambda',
                             aws_access_key_id=aws_access_key_id,
                             aws_secret_access_key=aws_secret_access_key,
                             region_name=aws_region,
                             config=boto3.session.Config(connect_timeout=15, read_timeout=20))

gateway_client = boto3.client('apigateway',
                              aws_access_key_id=aws_access_key_id,
                              aws_secret_access_key=aws_secret_access_key,
                              region_name=aws_region,
                              config=boto3.session.Config(connect_timeout=15, read_timeout=20))



def upload_function_handler(data):
    function_code = request.form['function_code']
    functionName = request.form['entry_point']
    userName = data.username

    temp_file_name = str(uuid.uuid4()) + ".py"
    file_path = "/media/drive/dev-linux/casse-v3/" + temp_file_name

    with open(file_path, 'w') as temp_file:
        temp_file.write(function_code)

    zip_file_path = "/media/drive/dev-linux/casse-v3/lambda_function.zip"
    with zipfile.ZipFile(zip_file_path, 'w') as zipf:
        zipf.write(file_path, os.path.basename(file_path))

    handlerName = os.path.splitext(temp_file_name)[0] + "." + functionName

    with open(zip_file_path, 'rb') as zf:
        response = lambda_client.create_function(
            FunctionName=userName+'_'+functionName,
            Runtime='python3.8',
            Role=os.environ.get('AWS_ROLE'),
            Handler=handlerName,
            Code={
                'ZipFile': zf.read(),
            },
            Description='Test Function',
            Timeout=15,
            MemorySize=128
        )

    api_id = os.environ.get('API_ID')
    resource_id = None
    
    response = gateway_client.create_resource(
        restApiId=api_id,
        parentId=os.environ.get('PARENT_RESOURCE_ID'),
        pathPart=userName
    )
    response = gateway_client.create_resource(
        restApiId=api_id,
        parentId=response['id'],
        pathPart=functionName
    )
    resource_id = response['id']

    print("gateway_client.create_resource", response)

    response = gateway_client.put_method(
        restApiId=api_id,
        resourceId=resource_id,
        httpMethod='ANY',
        authorizationType='NONE',
        apiKeyRequired=False
    )

    print("gateway_client.put_method", response)

    response = gateway_client.put_integration(
        restApiId=api_id,
        resourceId=resource_id,
        httpMethod='ANY',
        type='AWS_PROXY',
        integrationHttpMethod='POST',
        uri='arn:aws:apigateway:'+os.environ.get('AWS_REGION')+':lambda:path/2015-03-31/functions/'+os.environ.get(
            'AWS_ARN') + userName+'_'+functionName+'/invocations',
        credentials=os.environ.get('AWS_ROLE')
    )

    print("gateway_client.put_integration", response)

    try:
        response = gateway_client.create_deployment(
            restApiId=api_id,
            stageName='dev'
        )
    except Exception as e:
        print(e)

    print("create_deployment", response)

    # Cleanup temporary files
    os.remove(file_path)
    os.remove(zip_file_path)

    weburl = os.environ.get('GATEWAY_URL')+userName+'/'+functionName

    new_function = Functions(
        entrypoint=functionName,
        description=request.form['description'],
        content=function_code,
        weburl=weburl,
        user_id=data.user_id
    )
    db.session.add(new_function)
    db.session.commit()


    return {
        'statusCode': 200,
        'body': {
            "message": "Function uploaded successfully",
            "functionName": userName+'_'+functionName,
            "url": weburl,
        }
    }
    # function_code = request.form['function_code']
    # functionName = request.form['entry_point']
    # userName = data.username

    # temp_file_name = str(uuid.uuid4()) + ".py"
    # file_path = "/media/drive/dev-linux/casse-v3/" + temp_file_name

    # with open(file_path, 'w') as temp_file:
    #     temp_file.write(function_code)

    # zip_file_path = "/media/drive/dev-linux/casse-v3/lambda_function.zip"
    # with zipfile.ZipFile(zip_file_path, 'w') as zipf:
    #     zipf.write(file_path, os.path.basename(file_path))

    # handlerName = os.path.splitext(temp_file_name)[0] + "." + functionName

    # with open(zip_file_path, 'rb') as zf:
    #     response = lambda_client.create_function(
    #         FunctionName=userName+'_'+functionName,
    #         Runtime='python3.8',
    #         Role=os.environ.get('AWS_ROLE'),
    #         Handler=handlerName,
    #         Code={
    #             'ZipFile': zf.read(),
    #         },
    #         Description='Test Function',
    #         Timeout=15,
    #         MemorySize=128
    #     )

    # api_id = os.environ.get('API_ID')

    # try:
    #     response = gateway_client.create_resource(
    #         restApiId=api_id,
    #         parentId=os.environ.get('PARENT_RESOURCE_ID'),
    #         pathPart=userName
    #     )
    #     response = gateway_client.create_resource(
    #         restApiId=api_id,
    #         parentId=response['id'],
    #         pathPart=functionName
    #     )
    # except Exception as e:
    #     print(e)

    # print("gateway_client.create_resource", response)

    # resource_id = response['id']

    # response = gateway_client.put_method(
    #     restApiId=api_id,
    #     resourceId=resource_id,
    #     httpMethod='ANY',
    #     authorizationType='NONE',
    #     apiKeyRequired=False
    # )

    # print("gateway_client.put_method", response)

    # response = gateway_client.put_integration(
    #     restApiId=api_id,
    #     resourceId=resource_id,
    #     httpMethod='ANY',
    #     type='AWS_PROXY',
    #     integrationHttpMethod='POST',
    #     uri='arn:aws:apigateway:'+os.environ.get('AWS_REGION')+':lambda:path/2015-03-31/functions/'+os.environ.get(
    #         'AWS_ARN') + userName+'_'+functionName+'/invocations',
    #     credentials=os.environ.get('AWS_ROLE')
    # )

    # print("gateway_client.put_integration", response)

    # try:
    #     response = gateway_client.create_deployment(
    #         restApiId=api_id,
    #         stageName='dev'
    #     )
    # except Exception as e:
    #     print(e)

    # print("create_deployment", response)

    # # Cleanup temporary files
    # os.remove(file_path)
    # os.remove(zip_file_path)

    # weburl = os.environ.get('GATEWAY_URL')+userName+'/'+functionName

    # new_function = Functions(
    #     entrypoint=functionName,
    #     description=request.form['description'],
    #     content=function_code,
    #     weburl=weburl,
    #     user_id=data.user_id
    # )   
    # db.session.add(new_function)
    # db.session.commit()
    # # return jsonify({'message': 'Function added successfully'}), 201


    # return {
    #     'statusCode': 200,
    #     'body': {
    #         "message": "Function uploaded successfully",
    #         "functionName": userName+'_'+functionName,
    #         "url": weburl,
    #     }
    # }


def loginfunc():
    auth = request.json

    if not auth or not auth['email'] or not auth['password']:
        return utils.resultdata(404, constants.FAILED_MESSAGE, 'Login username and password required',
                                'COULD_NOT_VERIFY')

    user = User.query.filter_by(user_email=auth['email']).first()

    if not user:
        return utils.resultdata(404, constants.FAILED_MESSAGE, 'User does not exist', 'COULD_NOT_VERIFY')

    if check_password_hash(user.password, auth['password']):
        User.query.filter_by(user_email=auth['email']).update(
            dict(last_login_date=datetime.now(timezone.utc)))
        db.session.commit()

        token = utils.generate_token(user)

        return utils.resultdata(200, constants.SUCCESS_MESSAGE, {'userId': user.user_id,
                                                                 'userFullName': user.user_fullname,
                                                                 'email': user.user_email,
                                                                 'username': user.username,
                                                                 'token': token,
                                                                 'lastLoginDate': user.last_login_date,
                                                                 }, 'LOGIN_VERIFIED')

    return utils.resultdata(404, constants.FAILED_MESSAGE, 'Wrong Password', 'WRONG_PASSWORD')


def signupfunc():
    data = request.json

    username, fullname, email = data['username'], data['fullname'], data['email']
    password = data['password']

    isEmailCheck = User.query.filter_by(user_email=email).first()

    isUsernameCheck = User.query.filter_by(username=username).first()

    if not isEmailCheck:
        if not isUsernameCheck:
            user = User(
                user_fullname=fullname,
                user_email=email,
                password=generate_password_hash(password),
                username=username)
            db.session.add(user)
            db.session.commit()
            return utils.resultdata(201, constants.SUCCESS_MESSAGE, 'Successfully Registered.', 'SUCCESS_REGISTERED')
        else:
            return utils.resultdata(404, constants.FAILED_MESSAGE, 'Username already exists. Please Log in.', 'USERNAME_EXISTS')
    else:
        return utils.resultdata(404, constants.FAILED_MESSAGE, 'Email already exists. Please Log in.', 'EMAIL_EXISTS')