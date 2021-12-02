const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));
const { v4: uuid } = require('uuid');

const client = new AWS.DynamoDB.DocumentClient({});

const eventBridge = new AWS.EventBridge({});

exports.exec = async (event) => {

  const { email, year, monthFrom, monthTo } = event.detail;

  const record = await client.query({
    TableName: process.env.DATA_TABLE,
    KeyConditionExpression: "id = :year AND yearMonth BETWEEN :monthFrom AND :monthTo",
        ExpressionAttributeValues: {
          ":year": year,
          ":monthFrom": Number(`${year}${monthFrom}`),
          ":monthTo": Number(`${year}${monthTo}`),
        },
  }).promise();

  const entry = {
    Source: "sendReports",
    DetailType: "email.send",
    Detail: JSON.stringify({
      id: uuid(),
      email,
      subject: `Report from ${year}${monthFrom} to ${year}${monthTo}`,
      body: createTable(record.Items),
      title: `Report from ${year}${monthFrom} to ${year}${monthTo}`,
    }),
  };

  console.warn('Creating new event', entry);

  await eventBridge.putEvents({
      Entries: [
        entry,
      ],
    }).promise();

}

const createTable = (items) => {
const header = `
<tr>
  <th>yearMonth</th>
  <th>amount</th>
</tr>
`

const rows = items.map(({ yearMonth, amount }) => createRow(yearMonth, amount));

return `
  <table>
  ${header}
  ${rows}
  </table>
`;

}

const createRow = (yearMonth, amount) => `
<tr>
  <td>${yearMonth}</td>
  <td>${amount}</td>
</tr>`;