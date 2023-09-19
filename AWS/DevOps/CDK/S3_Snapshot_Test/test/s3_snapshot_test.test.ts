import { Template } from "aws-cdk-lib/assertions"
import { App } from 'aws-cdk-lib/core';
import { S3SnapshotTestStack } from '../lib/s3_snapshot_test-stack';

// Snapshot test
test("S3 Bucket created", () => {
  // Instantiate the cdk app
  const app = new App();

  // Create S3 Stack
  const cdkS3Stack = new S3SnapshotTestStack(app, "CdkS3Stack");

  // Prepare the stack for assertions
  const template = Template.fromStack(cdkS3Stack);

  // Match with Snapshot
  expect(template.toJSON()).toMatchSnapshot();
});