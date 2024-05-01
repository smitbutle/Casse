
from app import app
from app.controllers_aws import *
from app.controller_scheduler import *
from app.utils import ApiKeyVerify


base_path = os.environ.get('BASE_PATH')


@app.route('/getfunctions', methods=['GET'])
@ApiKeyVerify
def get_functions(data):
    return get_functions_handler(data)


@app.route('/', methods=['GET'])
@ApiKeyVerify
def init(data):
    return jsonify(data)




@app.route(base_path + '/signup', methods=['POST'])
def signup():
    return signupfunc()


@app.route(base_path + '/login', methods=['POST'])
def login():
    return loginfunc()


@app.route(base_path + '/upload', methods=['POST'])
@ApiKeyVerify
def upload_function(data):
    return upload_function_handler(data)
    


@app.route(base_path + '/jobs', methods=['GET'])
@ApiKeyVerify
def getJobs(data):
    return get_jobs(data)



@app.route(base_path + '/alljobs', methods=['GET'])
def getJobsAll():
    return get_all_functions()


@app.route(base_path + '/scheduler', methods=['POST'])
@ApiKeyVerify
def create_scheduler(data):
    return create_scheduler_func(data)

@app.route(base_path + '/myfunc', methods=['GET'])
@ApiKeyVerify
def saved_functions(data):
    return get_saved_functions(data)