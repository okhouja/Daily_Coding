"""
This script manages Amazon EC2 instances using the Boto3 Python SDK.
"""
# import statements
import boto3

# create ec2 resource and instance name
ec2 = boto3.resource('ec2')
instance_name = 'lieb-ec2-1'

# store instance id
instance_id = None

# Check if instance which you are trying to create already exists 
# and only work with an instance that hasn't been terminated
instances = ec2.instances.all()
instance_exists = False

for instance in instances:
    for tag in instance.tags:
        if tag['Key'] == 'Name' and tag['Value'] == instance_name:
            instance_exists = True
            instance_id = instance.id
            print(f"An instance named '{instance_name}' with id '{instance_id}' already exists.")
            break
    if instance_exists:
        break

if not instance_exists:
    # Launch a new EC2 instance if it hasn't already been created
    new_instance = ec2.create_instances(
            ImageId='ami-05c13eab67c5d8861',  # replace with a valid AMI ID / Amazon Linux 2023 AMI _ Free Tier
            MinCount=1,
            MaxCount=1,
            InstanceType='t2.micro',           
            KeyName='MYKeyPair',  # replace with your key pair name
            SubnetId='subnet-00852830408695dee',
            TagSpecifications=[
                {
                    'ResourceType': 'instance',
                    'Tags': [
                        {
                            'Key': 'Name',
                            'Value': instance_name
                        },
                    ]
                },
            ]
        )
    instance_id = new_instance[0].id    
    print(f"Instance named '{instance_name}' with id '{instance_id}' created.")



# Stop an instance 
# ec2.Instance(instance_id).stop()
# print(f"Instance '{instance_name}-{instance_id}' stopped.")

# Start an instance 
# ec2.Instance(instance_id).start()
# print(f"Instance '{instance_name}-{instance_id}' started.")

# Terminate an instance 
ec2.Instance(instance_id).terminate()
print(f"Instance '{instance_name}-{instance_id}' has been terminated.")
