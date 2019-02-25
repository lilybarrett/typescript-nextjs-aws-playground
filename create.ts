import { APIGatewayEvent, Handler } from "aws-lambda";
import AWS from "aws-sdk";
import uuid from "uuid";

const client = new AWS.DynamoDB.DocumentClient();

export const run: Handler = async (event: APIGatewayEvent) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "todos",
        Item: {
            id: uuid(),
            text: data.text,
            checked: false,
        },
    };

    await client.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(data),
    };
    return response;
};
