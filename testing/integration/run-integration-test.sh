#!/usr/bin/env bash

# path to this file
FILE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
# Go to the root of the project
cd $FILE_DIR/../..

# Build the lambda image to be used in the integration test with SAM
docker-compose -f docker-compose.yml build

# Start the mock server and SAM with the api server
docker-compose -f docker-compose.yml up -d lambdas mb
echo "Waiting for the stack to be ready"
sleep 10

# Run the integration test
docker-compose up integration-test
docker-compose logs lambdas
docker-compose -f docker-compose.yml down
