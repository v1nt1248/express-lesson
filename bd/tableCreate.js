const Promise = require('bluebird');

const params = {
  TableName: 'Phones',
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'N' }
  ],
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

const createTable = function(dynamodb) {
  return new Promise((resolve, reject) => {
    dynamodb.createTable(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = createTable;
