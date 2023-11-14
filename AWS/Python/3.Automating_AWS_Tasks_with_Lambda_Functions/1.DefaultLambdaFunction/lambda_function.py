import json

def lambda_handler(event, context):
    # Hello from VSCode
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
