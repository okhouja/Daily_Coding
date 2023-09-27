// import * as cdk from 'aws-cdk-lib';
// import '@aws-cdk/assert/jest';
// import { Capture,Match,Template } from 'aws-cdk-lib/assertions';
// import {App,Stack} from 'aws-cdk-lib/core';

// import {DeadLetterQueue } from '../lib/dead-letter-queue';
// import dlq = require('../lib/dead-letter-queue');

// test('dlq creates an alarm', () => {
//   const app = new App();
//   const dlqStack = new DeadLetterQueue(app, 'DLQ');
// const template = Template.fromStack(dlqStack)

//   // expect(template.toJSON()).toMatchSnapshot();;

//   expect(template.hasResourceProperties('AWS::CloudWatch::Alarm', {
//     MetricName: 'ApproximateNumberOfMessagesVisible',
//     Namespace: 'AWS/SQS',
// }))
// });


// test('retention period can be configured', () => {
//   const app = new cdk.App();
//   const dlqStack = new DeadLetterQueue(app, 'DLQ', {
//     retentionDays: 7
//   })
//   const template = Template.fromStack(dlqStack)

//   // new DeadLetterQueue(app, 'DLQ', {
//   //   retentionDays: 7
//   // });

//   expect(app.hasResource('AWS::SQS::Queue', {
//     MessageRetentionPeriod: 604800
//   }))

//   // expect(dlqStack).toHaveResource('AWS::SQS::Queue', {
//   //   MessageRetentionPeriod: 604800
//   // });
// });

// test('configurable retention period cannot exceed 14 days', () => {
//   const stack = new App();

//   expect(() => {
//      new DeadLetterQueue(stack, 'DLQ', {
//       retentionDays: 15
//     });
//   }).toThrowError(/retentionDays may not exceed 14 days/);
// });



// new code
import * as cdk from 'aws-cdk-lib';

// import '@aws-cdk/assert/jest';
// import {App,Stack} from 'aws-cdk-lib/core';

// import { Stack } from '@aws-cdk/core';
import { Capture,Match,Template } from 'aws-cdk-lib/assertions';


import dlq = require('../lib/dead-letter-queue');

let app: cdk.App, stack: cdk.Stack, template: Template;


test('retention period can be configured', () => {
  // const app = new App();

  new dlq.DeadLetterQueue(app, 'DLQ', {
    retentionDays: 7
  });

  expect(template.hasResource('AWS::SQS::Queue', {
    MessageRetentionPeriod: 604800
  }))
});

test('configurable retention period cannot exceed 14 days', () => {
  // const app = new App();

  expect(() => {
    new dlq.DeadLetterQueue(stack, 'DLQ', {
      retentionDays: 15
    });
  }).toThrowError(/retentionDays may not exceed 14 days/);
});