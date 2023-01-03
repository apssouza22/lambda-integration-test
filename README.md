# Lambda Integration test

Project example of lambda integration test with AWS CDK + SAM + Docker + Docker-compose + Mock server


This is a Typescript CDK Stack consisting of:
 - **AWS HTTP API Gateway** with following endpoints:
   - `POST /google` - proxy endpoint to Google
   - `GET /lambada1` - endpoint with Javascript Lambda 
   - `GET /lambada2` - endpoint with Python Lambda

## Integration test with SAM
- `cdk synth --no-staging`
- `testing/integration/run-integration-test.sh` to run integration tests