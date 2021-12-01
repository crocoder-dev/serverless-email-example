const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));
const { v4: uuid } = require('uuid');


const client = new AWS.DynamoDB.DocumentClient({});

exports.exec = async (event) => {
  const timestamp = new Date().getTime();
  try {
    const { email } = JSON.parse(event.body);

    const user = {
      id: uuid(),
      email,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    await client.put({
      TableName: process.env.USERS_TABLE,
      Item: user,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create a new user.',
    };
  }
};
