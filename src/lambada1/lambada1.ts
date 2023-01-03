import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
	event: APIGatewayEvent,
	context: Context
): Promise<APIGatewayProxyResult> => {
	console.log(`Event: ${JSON.stringify(event, null, 2)}`)
	console.log(`Context: ${JSON.stringify(context, null, 2)}`)
	// console.log(process.env.ENV_VAL)
	return {
		statusCode: 200,
		headers: { 'Content-Type': 'text/json' },
		body: JSON.stringify({
			message: '💃🏽💃🏽💃🏽',
			env_val: `${process.env.ENV_VAL}`
		})
	}
}
