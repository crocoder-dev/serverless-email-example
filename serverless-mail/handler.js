const fs = require('fs');
const AWS = require('aws-sdk');
const util = require('util');

const emailService = new AWS.SES({ apiVersion: '2010-12-01' });

const readFile = util.promisify(fs.readFile);

const createEmailMessage = (title, email, body) => {
  const message = await readFile('./index.html', 'utf8');

  return message.replaceAll('{{title}}', title).replaceAll('{{email}}', email).replaceAll('{{body}}', body);
}

exports.sendEmail = async (event) => {
  const { email, title, subject, body } = event.detail;

  const params = {
    Destination: {
      ToAddresses: [
        email,
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: createEmailMessage(title, email, body),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: 'hello@crocoder.dev',
  };

  await emailService.sendEmail(params).promise();

}