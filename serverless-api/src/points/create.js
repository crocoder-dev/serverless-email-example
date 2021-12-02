const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));
const { v4: uuid } = require('uuid');

const client = new AWS.DynamoDB.DocumentClient({});

exports.exec = async (event) => {
  const unixTimestamp = new Date().getTime();
  try {
    const { value, timestamp } = JSON.parse(event.body);

    if(!Number.isInteger(value)) throw new Error('Value should be integer');

    const point = {
      id: uuid(),
      value,
      timestamp,
      createdAt: unixTimestamp,
      updatedAt: unixTimestamp,
    };

    await client.put({
      TableName: process.env.POINTS_TABLE,
      Item: point,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(point),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create a new data point.',
    };
  }
};
