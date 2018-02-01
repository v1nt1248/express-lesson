const Promise = require('bluebird');

const params = {
  TableName: 'Phones',
  Item: {}
};

const queryParams = {
  TableName: 'Phones',
  KeyConditionExpression: 'maxId = max :id'
};

const addTableItem = function(docClient, item) {

};

module.exports = addTableItem;
