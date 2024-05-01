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

    


# Convert function to string
function_string = inspect.getsource(testfunc)

# Create a JSON object with the function string as the value
json_data = {
    "function": function_string
}

# Convert the JSON object to a string
json_string = json.dumps(json_data)

# Print the JSON string
print(json_string)