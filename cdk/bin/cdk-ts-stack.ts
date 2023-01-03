#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'
import { CdkTsStack } from '../lib/cdk-ts-stack'


const app = new App()
new CdkTsStack(app, 'CdkTsStack', {
	environment: 'dev',
	something: 'lambada :)'
})
