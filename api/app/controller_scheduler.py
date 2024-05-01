
from app import db
from app import utils
from app import constants
from app.models import User, Functions
from app.utils import filter_jobs
from flask import request,jsonify


import json
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
import requests
import boto3
import os
import zipfile

import dotenv
import uuid

username = "clockwerk"  
password = "password"

go_api_path = os.environ.get('JOB_RUNNER_API_URL')

def get_functions_handler(current_user):
    try:
        user_functions = Functions.query.filter_by(user_id=current_user.user_id).all()
        functions_data = []
        for function in user_functions:
            function_data = {
                'function_id': function.function_id,
                'entrypoint': function.entrypoint,
                'description': function.description,
                'content': function.content,
                'weburl': function.weburl,
                'create_date': function.create_date.strftime('%Y-%m-%d %H:%M:%S') if function.create_date else None,
                'resource_id': function.resource_id,
                'user_id': function.user_id
            }
            functions_data.append(function_data)
        return jsonify({'functions': functions_data}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e), 'code': 'INTERNAL_SERVER_ERROR'}), 500


def filter_jobs(jobs_data, username):
    filtered_jobs = []
    for job in jobs_data.get('schedulers', []):
        if job.get('name').split('@')[0] == username:
            filtered_jobs.append(job)
    return filtered_jobs


def get_all_functions():
    response = requests.get(go_api_path + '/schedulers')
    if response.status_code == 200:
        jobs_data = response.json()
        return jsonify(jobs_data), 200
    else:
        return jsonify({'error': 'Failed to fetch job data'}), response.status_code


def get_jobs(data):

    response = requests.get(go_api_path + '/schedulers')
    if response.status_code == 200:
        jobs_data = response.json()
        
        filtered_jobs = filter_jobs(jobs_data, data.username)
        for job in filtered_jobs:
            job['name'] = job.get('name').split('@')[1]
        return filtered_jobs, 200

    else:
        return jsonify({'error': 'Failed to fetch job data'}), response.status_code


def create_scheduler_func(data):
    scheduler_data = request.json

    body_req = {
        'name': data.username+'@'+scheduler_data.get('name'),
        'url': scheduler_data.get('url'),
        'referenceId': str(uuid.uuid4()),
        'executor': 'http',
        'method': scheduler_data.get('method'),
        'body': json.dumps(scheduler_data.get('body')) or "",
        'retry': int(scheduler_data.get('retry')) or 0,
        'retryThreshold': int(scheduler_data.get('retryThreshold')) or 0,
        'persist': scheduler_data.get('persist') or False,
        'disabled': scheduler_data.get('disabled') or False,
        'spec': scheduler_data.get('spec'),
        'headers': ["Content-Type|application/json"],
        'username': "clockwerk",
        'password': "password"
    }

    required_fields = ['name', 'url', 'method', 'spec']
    if not all(body_req.get(field) for field in required_fields):
        for field in required_fields:
            print (body_req.get(field) )
        return jsonify({'error': 'Please fill all the required fields'}), 400

    try:
        response = requests.post(go_api_path+"/scheduler", json=body_req)
        print(response.json())

        if response.status_code != 200 :
            return jsonify({'error': 'Failed to create scheduler'}), response.status_code
        return jsonify({'message': 'Scheduler created successfully', 'data': response.json()}), 201

    except Exception as e:
        return jsonify({'error': 'Failed to create scheduler', 'message': str(e)}), 500


def get_saved_functions(data):
    try:
        user_functions = Functions.query.filter_by(user_id=data.user_id).all()
        functions_data = []
        for function in user_functions:
            function_data = {
                'function_id': function.function_id,
                'entrypoint': function.entrypoint,
                'description': function.description,
                'content': function.content,
                'weburl': function.weburl,
                'create_date': function.create_date.strftime('%Y-%m-%d %H:%M:%S') if function.create_date else None,
                'resource_id': function.resource_id,
                'user_id': function.user_id
            }
            functions_data.append(function_data)
        return jsonify({'functions': functions_data}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e), 'code': 'INTERNAL_SERVER_ERROR'}), 500
    
def send_email(data):
    emailData = request.json
    # emailData.username
    # emailData.fullname
    # emailData.email
    # emailData.jobName
    # emailData.nextExecutionString


def delete_job_function(data):
    req_data = request.json

    scheduler_id = req_data.get('id')
    reference_id = req_data.get('referenceId')

    req = {
        'id': scheduler_id,  
        'referenceId': reference_id,
        'username': username,
        'password': password
    }
    response = requests.post(go_api_path + '/scheduler/' + scheduler_id, json=req)

    if response.status_code == 200:
        return jsonify({'message': 'Scheduler deleted successfully'}), 200
    else:
        return jsonify({'message': 'Failed to delete scheduler'}), response.status_code

def toggle_job_function(data):
    req_data = request.json

    scheduler_id = req_data.get('id')
    reference_id = req_data.get('referenceId')
    disabled = req_data.get('disabled')

    req = {
        'id': scheduler_id,  
        'referenceId': reference_id,
        'disabled': disabled,
        'username': username,
        'password': password
    }
    
    response = requests.post(go_api_path + '/scheduler/toggle/'+ scheduler_id, json=req)
    print(response.json())
    if response.status_code == 200:
        return jsonify({'message': 'Scheduler toggle successfully'}), 200
    else:
        return jsonify({'message': 'Failed to toggle scheduler'}), response.status_code
