// import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {App } from 'aws-cdk-lib/core';

import {DeadLetterQueue} from '../lib/dead-letter-queue';

test('dlq creates an alarm', () => {
  const app = new App();
  const dlqStack = new DeadLetterQueue(app, 'DLQ');
const template = Template.fromStack(dlqStack)

  expect(template.toJSON()).toMatchSnapshot();;
});