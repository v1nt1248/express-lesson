const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'https://dynamodb.eu-central-1.amazonaws.com'
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const createTable = require('./createTable');


exports.dataBase = dynamodb;
exports.table = docClient;
exports.createTable = createTable;