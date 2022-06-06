# Coralogix RabbitMQ Agent
## _Get Metrics from RabbitMQ API and Send it to Coralogix_

This Application is a tool to pull Metrics from Rabbit MQ Admin UI.

_Requirements_
  - User with access to RabbitMQ Admin UI
  - AWS account
  - Your User should have AWS Cli and SAM Installed and working.
  - Conectivity between AWS Lambda Functions and RabbitMQ Admin UI
  
--------------------------------------------------------------------

  1. Clone this repository into you Computer
  2. Deploy the lambda
```
# sam build
# sam deploy --guided
```
  3. Edit the following Environment Variables:

| Variable | Description |
| -------- | ----------- |
| APPLICATION_NAME | Coralogix Application Metadata |
| SUBSYSTEM | Coralogix Subsystem Metadata |
| PRIVATE_KEY | Coralogix Private Key |
| RABBITMQ_USERNAME | Rabbit Admin UI Username |
| RABBITMQ_PASSWORD | Rabbit Admin UI Password |
| RABBITMQ_FQDN | Rabbit Admin UI URL |

If your Account is not in the EU region (the account url does not have a .com suffix)
you will need to add this environment variable:
```
CORALOGIX_URL=https://<coralogix_cluster_url>/api/v1/logs
```
Cluster location | coralogix_cluster_url
-----------------| --------------------
US| api.coralogix.us
IN| api.app.coralogix.in
Singapore| api.coralogixsg.com
EU2| api.eu2.coralogix.com

--------------------------------------------------------------------

This Current Version Supports Overview, Queues, Nodes and Connections API. Documentation [here](https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.8.19/deps/rabbitmq_management/priv/www/api/index.html)
