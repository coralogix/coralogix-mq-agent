# Coralogix RabbitMQ Agent
## _Get Metrics from RabbitMQ API and Send it to Coralogix_

_Requirements_
  - User with access to RabbitMQ Admin UI
  - AWS account
  - Conectivity between AWS Lambda Functions and RabbitMQ Admin UI
  
--------------------------------------------------------------------

  1. Create a new Lambda Function in AWS.
  2. Upload Archive.zip 
  3. Create An EventBridge Trigger for your Lambda function. Run each Event every 1 Minute.
  4. Set up Lambda Timeout to 5s.
  5. Create the following Environment Variables:

| Variable | Description |
| -------- | ----------- |
| APPLICATION_NAME | Coralogix Application Metadata |
| SUBSYSTEM | Coralogix Subsystem Metadata |
| PRIVATE_KEY | Coralogix Private Key |
| RABBITMQ_USERNAME | Rabbit Admin UI Username |
| RABBITMQ_PASSWORD | Rabbit Admin UI Password |
| RABBITMQ_FQDN | Rabbit Admin UI URL |
| AWS_NODEJS_CONNECTION_REUSE_ENABLED | 1 |


--------------------------------------------------------------------

This Current Version Supports Overview and Queues API. Documentation [here](https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.8.19/deps/rabbitmq_management/priv/www/api/index.html)
