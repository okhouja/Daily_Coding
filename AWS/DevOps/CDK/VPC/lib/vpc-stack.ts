import * as cdk from "aws-cdk-lib";
// import {aws_ecs as ecs,aws_ec2 as ec2,aws_ecs_patterns as ecs_patterns}  from 'aws-cdk-lib';
// import { IpAddresses } from "aws-cdk-lib/aws-ec2";
import * as ec2 from "aws-cdk-lib/aws-ec2";

import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class VpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new ec2.CfnVPC(this, 'MyVPC', { cidrBlock: '10.0.0.0/16'})

    // new ec2.Vpc(this, "MyVPC", { cidr: "10.0.0.0/16" });

    new ec2.Vpc(this, "MyVPC", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
    });
  }
}
