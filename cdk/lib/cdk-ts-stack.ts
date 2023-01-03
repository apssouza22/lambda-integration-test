import * as path from 'path'
import {HttpApi, HttpMethod} from '@aws-cdk/aws-apigatewayv2-alpha'
import {HttpLambdaIntegration, HttpUrlIntegration} from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import {PythonFunction} from '@aws-cdk/aws-lambda-python-alpha'
import {CfnOutput, Duration, Stack, StackProps} from 'aws-cdk-lib'
import {Runtime} from 'aws-cdk-lib/aws-lambda'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Construct} from 'constructs'


export interface CdkTsStackProps extends StackProps {
  environment: string
  something: string
}

export class CdkTsStack extends Stack {
  constructor(scope: Construct, id: string, props: CdkTsStackProps) {
    super(scope, id, props)

    const getLambada1 = new NodejsFunction(this, 'get-lambada-function-1', {
      runtime: Runtime.NODEJS_16_X,
      functionName: 'get-lambada-function-1-ts',
      entry: path.join(__dirname, '..', '..','src', 'lambada1', 'lambada1.ts'),
      handler: 'handler',
      memorySize: 1024,
      timeout: Duration.seconds(300),
      description: 'lambada fn 1',
      environment: {
        ENV_VAL: props.something
      }
    })

    const getLambada2 = new PythonFunction(this, 'get-lambada-function-2', {
      runtime: Runtime.PYTHON_3_9,
      functionName: 'get-lambada-function-2-py',
      entry: path.join(__dirname, '..','..', 'src', 'lambada2'),
      index: 'lambada2.py',
      handler: 'handler',
      memorySize: 1024,
      timeout: Duration.minutes(1),
      description: 'lambada fn 2',
      environment: {
        ENV_VAL: props.something
      }
    })

    // const authorizer = new HttpJwtAuthorizer(
    //     'lambadaAuthorizer',
    //     baseAuth0URL,
    //     {
    //       jwtAudience: [auth0audience]
    //     }
    // )

    const httpApi = new HttpApi(this, 'lambada-api-gateway', {
      description: 'lambada api gateway',
      // defaultAuthorizationScopes: ['something'],
      // defaultAuthorizer: authorizer,
    })


    httpApi.addRoutes({
      path: '/google',
      methods: [HttpMethod.POST],
      integration: new HttpUrlIntegration('proxy', 'https://google.com')
    })

    httpApi.addRoutes({
      path: '/lambada1',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration('get-lambada-integration', getLambada1),
      authorizationScopes: ['read:lambada1']
    })

    httpApi.addRoutes({
      path: '/lambada2',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration('get-lambada-integration', getLambada2)
    })

    new CfnOutput(this, 'apiUrl', {
      value: httpApi.url || 'whatever'
    })
  }
}
