export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    // java: "15.0.2",
    // csharp: "6.12.0",
    // php: "8.2.3",
  };
  
  export const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    // python: `import json\n\nprint('Loading function')\n\n\ndef lambda_handler(event, context):\n    print("Received event: " + json.dumps(event, indent=2))\n    print("value1 = " + event['key1'])\n    print("value2 = " + event['key2'])\n    print("value3 = " + event['key3'])\n    return event['key1']  # Echo back the first key value\n    #raise Exception('Something went wrong')`,
    python:`#example function\n\nimport boto3\nimport json\n\nprint('Loading function')\ndynamo = boto3.client('dynamodb')\n\n\ndef respond(err, res=None):\n    return {\n        'statusCode': '400' if err else '200',\n        'body': err.message if err else json.dumps(res),\n        'headers': {\n            'Content-Type': 'application/json',\n        },\n    }\n\n\ndef lambda_handler(event, context):\n    '''Demonstrates a simple HTTP endpoint using API Gateway. You have full\n    access to the request and response payload, including headers and\n    status code.\n\n    To scan a DynamoDB table, make a GET request with the TableName as a\n    query string parameter. To put, update, or delete an item, make a POST,\n    PUT, or DELETE request respectively, passing in the payload to the\n    DynamoDB API as a JSON body.\n    '''\n    #print("Received event: " + json.dumps(event, indent=2))\n\n    operations = {\n        'DELETE': lambda dynamo, x: dynamo.delete_item(**x),\n        'GET': lambda dynamo, x: dynamo.scan(**x),\n        'POST': lambda dynamo, x: dynamo.put_item(**x),\n        'PUT': lambda dynamo, x: dynamo.update_item(**x),\n    }\n\n    operation = event['httpMethod']\n    if operation in operations:\n        payload = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])\n        return respond(None, operations[operation](dynamo, payload))\n    else:\n        return respond(ValueError('Unsupported method "{}"'.format(operation)))\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
      'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
  };
  