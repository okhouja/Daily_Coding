#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkTestStack } from '../lib/cdk_test-stack';

const app = new cdk.App();
new CdkTestStack(app, 'CdkTestStack');
