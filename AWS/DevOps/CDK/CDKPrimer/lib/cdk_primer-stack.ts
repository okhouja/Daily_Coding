// import { Construct } from 'constructs';
// // import * as sqs from 'aws-cdk-lib/aws-sqs';

// export class CdkPrimerStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // The code that defines your stack goes here

//     // example resource
//     // const queue = new sqs.Queue(this, 'CdkPrimerQueue', {
//     //   visibilityTimeout: cdk.Duration.seconds(300)
//     // });
//   }
// }

// import * as cdk from "@aws-cdk/core";
// import * as ec2 from "@aws-cdk/aws-ec2";
// import * as ecs from "@aws-cdk/aws-ecs";
// import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";


import * as cdk from 'aws-cdk-lib';

import {aws_ecs as ecs,aws_ec2 as ec2,aws_ecs_patterns as ecs_patterns}  from 'aws-cdk-lib';
import { Construct } from "constructs";

export class CdkPrimerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", { maxAzs: 2 });

    const cluster = new ecs.Cluster(this, "MyCluster", { vpc: vpc });

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "MyFargateService",
      {
        cluster: cluster,

        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
        },

        publicLoadBalancer: true,
      }
    );
  }
}

