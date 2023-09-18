import * as cdk from '@aws-cdk/core';
// import * as cdk from 'aws-cdk-lib';
import * as widget_service from '../lib/widget_service';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyWidgetServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new widget_service.WidgetService(this, 'Widgets');
  }
}
