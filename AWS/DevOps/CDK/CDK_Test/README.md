# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkTestStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


<!-- to destroy -->
<!-- 
cdk destroy
aws s3 rm --recursive s3://$(aws s3 ls | grep cdktoolkit | cut -d' ' -f3) # empty the cdktoolkit staging bucket
aws cloudformation delete-stack --stack-name CDKToolkit -->