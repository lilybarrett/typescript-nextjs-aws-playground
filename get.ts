import { APIGatewayEvent, Handler } from "aws-lambda";
import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export const run: Handler = async (event: APIGatewayEvent) => {
    const params = {
        TableName: "todos",
        Key: {
            id: event.pathParameters.id,
        },
    };

    const result = await client.get(params).promise();
    if (result.Item) {
       return {
           statusCode: 200,
           body: JSON.stringify(result.Item),
       };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Couldn't find the item" }),
        };
    }
};


