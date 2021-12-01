const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const client = new AWS.DynamoDB.DocumentClient({});

exports.exec = async (event) => {
  try {
    const { id } = JSON.parse(event.body);

    const key = {
      id,
    }

    await client.delete({
      TableName: process.env.USERS_TABLE,
      Key: key,
    }).promise();

    return {
      statusCode: 204,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t remove the user.',
    };
  }
};
