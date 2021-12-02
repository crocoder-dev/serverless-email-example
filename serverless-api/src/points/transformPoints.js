const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const eventBridge = new AWS.EventBridge({});

exports.exec = async (event) => {
  try {
    const { eventName } = event.Records[0];
    if(eventName === 'INSERT') {

      const { value, timestamp } = AWS.DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.NewImage);
        
      const date = new Date(Number(timestamp));
  
      const year = date.getFullYear();
  
      const month = date.getMonth();
  
      const stringifiedMonth = month > 9 ? `${month}` : `0${month}`;
  
      const entry = {
        Source: "transformPoints",
        DetailType: "point.created",
        Detail: JSON.stringify({
          id: `${year}`,
          yearMonth: `${year}${stringifiedMonth}`,
          timestamp,
          value,
        }),
      };

      console.warn('Creating new event', entry);

      await eventBridge.putEvents({
        Entries: [
          entry,
        ],
      }).promise();
    }
  } catch (error) {
    console.error(error);
  }
}