const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const eventBridge = new AWS.EventBridge({});

exports.exec = async (event) => {
  try {
    const { eventName } = event.Records[0];

    let subject, body, title;

    const { id, email, createdAt } = AWS.DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.NewImage);
      
    if(eventName === 'INSERT') {
      subject = `Welcome to serverless-email-example`;
      body = `Your user with id ${id} was created at ${new Date(createdAt).toLocaleString()}`;
      title = `Welcome!`
    } else if (eventName === 'REMOVE') {
      subject = `We are sorry to see you go`;
      body = `Your user with id ${id} have just been deleted. Farwell!`;
      title = `Come back soon!`
    }

    const entry = {
      Source: "notifyUser",
      DetailType: "email.send",
      Detail: JSON.stringify({
        id,
        email,
        subject,
        body,
        title,
      }),
    };

    console.warn('Creating new event', entry);
    
    await eventBridge.putEvents({
        Entries: [
          entry,
        ],
      }).promise();

  } catch (error) {
    console.error(error);
  }
}