import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import { Stack, StackProps } from 'aws-cdk-lib';

// An sqs queue for unsuccessful invocations of a lambda function
import * as sqs from 'aws-cdk-lib/aws-sqs'
import { Construct } from 'constructs';

export class DeadLetterQueue extends Stack {
  public readonly messagesInQueueAlarm: cloudwatch.IAlarm;

  constructor(scope: Construct, id: string,props?:StackProps) {
    super(scope, id);

    // const metric = queue.metric("ApproximateNumberOfMessagesVisible");
    const metric = new cloudwatch.Metric({
        namespace: 'MyNamespace',
        metricName: 'MyMetric',
        dimensionsMap: { MyDimension: 'MyDimensionValue' }
      });

    // Add the alarm
    this.messagesInQueueAlarm = new cloudwatch.Alarm(this, 'Alarm', {
      alarmDescription: 'There are messages in the Dead Letter Queue',
      evaluationPeriods: 1,
      threshold: 1,
      metric: metric,
    });
  }
}