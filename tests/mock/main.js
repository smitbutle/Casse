const axios = require('axios');
const fs = require('fs').promises;

const funcBody0 = "import json\nimport inspect\n\ndef testfunc_call_api(event, context):\n    api_url = \"https://api.example.com/data\"\n    try:\n        response = requests.get(api_url)\n        if response.status_code == 200:\n            data = response.json()\n            print(\"API Response:\", data)\n            return {\n                'statusCode': 200,\n                'body': json.dumps(data)\n            }\n        else:\n            print(\"API call failed with status code:\", response.status_code)\n            return {\n                'statusCode': response.status_code,\n                'body': json.dumps('API call failed')\n            }\n    except Exception as e:\n        print(\"Error occurred during API call:\", str(e))\n        return {\n            'statusCode': 500,\n            'body': json.dumps('Internal Server Error')\n        }\n"
const funcName0 = "testfunc_call_api"

const funcBody1 = "import json\n\ndef helloWorld(event, context):\n    return {\n        'statusCode': 200,\n        'body': json.dumps('Hello from smit!')\n    }\n"
const funcName1 = "helloWorld"

const funcBody2 = "import json\nimport inspect\n\ndef deployTrigger(event, context):\n    api_url = \"https://api.example.com/data\"\n    try:\n        response = requests.get(api_url)\n        if response.status_code == 200:\n            data = response.json()\n            print(\"API Response:\", data)\n            return {\n                'statusCode': 200,\n                'body': json.dumps(data)\n            }\n        else:\n            print(\"API call failed with status code:\", response.status_code)\n            return {\n                'statusCode': response.status_code,\n                'body': json.dumps('API call failed')\n            }\n    except Exception as e:\n        print(\"Error occurred during API call:\", str(e))\n        return {\n            'statusCode': 500,\n            'body': json.dumps('Internal Server Error')\n        }\n"
const funcName2 = "deployTrigger"

const apiUrl = 'http://127.0.0.1:8000/api/';


async function simulatePostRequest(url, data, token = null) {
    try {
        response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token || ''
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function readJsonFile(filePath) {
    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error.message);
        return null;
    }
}


async function main() {
    const mockData = await readJsonFile('CasseTest.json');

    if (mockData) {

        for (const data of mockData) {
            try {
                const signUpBody = {
                    "username": data.username,
                    "password": data.password,
                    "fullname": data.fullname,
                    "email": data.email,
                };
                let response = await simulatePostRequest(apiUrl + 'signup', signUpBody);
                console.log(response);

                const loginBody = {
                    "email": data.email,
                    "password": data.password,
                };
                response = await simulatePostRequest(apiUrl + 'login', loginBody);

                const token = response.result.token;

                for (const funcData of data.functions) {

                    const formData = new FormData();

                    switch (funcData.function_code) {
                        case "replaceThis1":
                            formData.append('function_code', funcBody0);
                            formData.append('entry_point', funcName0);
                            break;
                        case "replaceThis2":
                            formData.append('function_code', funcBody1);
                            formData.append('entry_point', funcName1);
                            break;
                        case "replaceThis3":
                            formData.append('function_code', funcBody2);
                            formData.append('entry_point', funcName2);
                            break;
                        default:
                    }

                    formData.append('description', funcData.description);

                    console.log(formData);

                    const response2 = await axios.post(apiUrl + 'upload', formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });


                    jobBody = {
                        "name": funcData.name,
                        "url": response2.data.body.url,
                        "method": funcData.method,
                        "body": {
                            "desc": funcData.body
                        },
                        "retry": funcData.retry,
                        "retryThreshold": funcData.retryThreshold,
                        "persist": funcData.persist,
                        "disabled": funcData.disabled,
                        "spec": funcData.spec
                    };
                    
                    response = await simulatePostRequest(apiUrl + 'scheduler', jobBody, token);

                    console.log(response);
                }

                for (const jobData of data.jobs) {
                    jobBody = {
                        "name": jobData.name,
                        "url": jobData.url.split("?")[0],
                        "method": jobData.method,
                        "body": {
                            "desc": jobData.body
                        },
                        "retry": jobData.retry,
                        "retryThreshold": jobData.retryThreshold,
                        "persist": jobData.persist,
                        "disabled": jobData.disabled,
                        "spec": jobData.spec
                    };

                    response = await simulatePostRequest(apiUrl + 'scheduler', jobBody, token);

                    console.log(response);
                }


            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    }


}

main();
