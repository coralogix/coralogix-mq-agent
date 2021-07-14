# Coralogix RabbitMQ Agent
## _Get Metrics from RabbitMQ API and Send it to Coralogix_


This Requires AWS Lambda Function node.js v12

. Upload code into lambda function.
. Create An EventBridge Trigger for your lambda function.
. This  Environment Variables need to be set.

| Variable | Description |
| -------- | ----------- |
| APPLICATION_NAME | Coralogix Application Metadata |
| SUBSYSTEM | Coralogix Subsystem Metadata |
| PRIVATE_KEY | Coralogix Private Key |
| RABBITMQ_USERNAME | Rabbit Admin UI Username |
| RABBITMQ_PASSWORD | Rabbit Admin UI Password |
| RABBITMQ_FQDN | Rabbit Admin UI URL |

