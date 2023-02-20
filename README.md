# Lambda Integration test

This project is a proof of concept of how to test lambda functions with AWS CDK + SAM + Docker + Docker-compose + Mock server

We have a lambda function that is called by an API Gateway. The lambda function is written in Typescript and the API Gateway is created with CDK. 

There are four elements that are important to test the lambda function:
- The lambda function itself
- The API Gateway
- The dependencies of the lambda function
- The integration tests

The API Gateway and the lambda function run on AWS SAM. The dependencies are stubbed with a Mountebank mock server or a dockerized version of the dependency.
All the services and their integration are orchestrated with docker-compose.

## Integration test with SAM
- `testing/integration/run-integration-test.sh` to run integration tests