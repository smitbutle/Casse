import jwt
from app import constants

from flask import jsonify,request, make_response
from functools import wraps
from datetime import datetime, timedelta, timezone
from app import models
from app import app

def generate_token(user):
    return jwt.encode({
        'user_id': user.user_id,
        'username': user.username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=60*24*30)
    }, app.config['SECRET_KEY'], algorithm='HS256')

def filter_jobs(jobs_data, username):
    filtered_jobs = []
    for job in jobs_data.get('schedulers', []):
        if job.get('name').split('@')[0] == username:
            filtered_jobs.append(job)
    return filtered_jobs

def resultdata(errorcode, message, result, key):
    return make_response(jsonify({'code': errorcode, 'message': message, 'result': result, 'key': key}), errorcode)


def localdecodetoken():
    token=generate_token()
    print(token)
    return jwt.decode(token, constants.APP_SECRET_KEY, "HS256")




def ApiKeyVerify(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')
            if len(token) > 1:
                token = token[1]
        if not token:
            return jsonify({'status': 'failed', 'message': 'Token is missing', 'code': 'MISSING_TOKEN'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = models.User.query.filter_by(user_id=data['user_id']).first()
        except:
            return jsonify({'status': 'failed', 'message': 'Token is invalid', 'code': 'INVALID_TOKEN'}), 401
        return f(current_user, *args, **kwargs)
    return decorated


# print(localdecodetoken())
# def isverifyjwttoken(access_token):
#     try:
#         dec = jwt.decode(access_token, constants.APP_SECRET_KEY, "HS256")
#         if dec is not None and dec['ACCESS_KEY'] is not None:
#             if dec['ACCESS_KEY'] == localdecodetoken()['ACCESS_KEY']:
#                 return True
#             else:
#                 return False
#         else:
#             return False
#     except Exception:
#         return False