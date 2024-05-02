import json
import inspect
import requests
def testfunc_call_api(event, context):
    api_url = "https://api.example.com/data"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            print("API Response:", data)
            return {
                'statusCode': 200,
                'body': json.dumps(data)
            }
        else:
            print("API call failed with status code:", response.status_code)
            return {
                'statusCode': response.status_code,
                'body': json.dumps('API call failed')
            }
    except Exception as e:
        print("Error occurred during API call:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps('Internal Server Error')
        }
    

import json
def testfunc(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from smit!')
    }

    
s = '''import json

print('Loading function')


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))
    print("value1 = " + event['key1'])
    print("value2 = " + event['key2'])
    print("value3 = " + event['key3'])
    return event['key1']  # Echo back the first key value
    #raise Exception('Something went wrong')'''

s = '''#example function

import boto3
import json

print('Loading function')
dynamo = boto3.client('dynamodb')


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
    ''Demonstrates a simple HTTP endpoint using API Gateway. You have full
    access to the request and response payload, including headers and
    status code.

    To scan a DynamoDB table, make a GET request with the TableName as a
    query string parameter. To put, update, or delete an item, make a POST,
    PUT, or DELETE request respectively, passing in the payload to the
    DynamoDB API as a JSON body.
    ''
    #print("Received event: " + json.dumps(event, indent=2))

    operations = {
        'DELETE': lambda dynamo, x: dynamo.delete_item(**x),
        'GET': lambda dynamo, x: dynamo.scan(**x),
        'POST': lambda dynamo, x: dynamo.put_item(**x),
        'PUT': lambda dynamo, x: dynamo.update_item(**x),
    }

    operation = event['httpMethod']
    if operation in operations:
        payload = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])
        return respond(None, operations[operation](dynamo, payload))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(operation)))
'''


# Convert function to string
# function_string = inspect.getsource(testfunc)

# Create a JSON object with the function string as the value
json_data = {
    "function": s
}

# Convert the JSON object to a string
json_string = json.dumps(json_data)

# Print the JSON string
print(json_string)