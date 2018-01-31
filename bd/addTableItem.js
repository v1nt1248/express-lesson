const Promise = require('bluebird');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'https://dynamodb.eu-central-1.amazonaws.com'
});

const docClient = new AWS.DynamoDB.DocumentClient();