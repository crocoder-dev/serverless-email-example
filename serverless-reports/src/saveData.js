const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));


const client = new AWS.DynamoDB.DocumentClient({});

exports.exec = async (event) => {
  const unixTimestamp = new Date().getTime();

  const { id, yearMonth, value } = event.detail;

  await client.update({
    TableName: process.env.DATA_TABLE,
    Key: { id, yearMonth: Number(yearMonth)},
    UpdateExpression:
      "SET amount = if_not_exists(amount,:v), updatedAt = :updatedAt, createdAt = if_not_exists(createdAt, :createdAt)",
    ExpressionAttributeValues: {
      ':v': 0,
      ':createdAt': unixTimestamp,
      ':updatedAt': unixTimestamp,
    }
  }).promise();

  await client.update({
    TableName: process.env.DATA_TABLE,
    Key: { id, yearMonth: Number(yearMonth)},
    UpdateExpression:
      "ADD amount :v",
    ExpressionAttributeValues: {
      ':v': value,
    }
  }).promise();

}