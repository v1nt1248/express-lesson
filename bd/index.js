const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'https://dynamodb.eu-central-1.amazonaws.com'
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const createTable = require('./tableCreate');
const deleteTable = require('./tableDelete');
const addTableItem = require('./tableItemAdd');
const delTableItem = require('./tableItemDel');
const updateTableItem = require('./tableItemDel');
const getTableItem = require('./tableItemGet');

exports.dataBase = dynamodb;
exports.table = docClient;
exports.createTable = createTable;
exports.deleteTable = deleteTable;
exports.addTableItem = addTableItem;
exports.delTableItem = delTableItem;
exports.updateTableItem = updateTableItem;
exports.getTableItem = getTableItem;
