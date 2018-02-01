const Promise = require('bluebird');

const params = {
  TableName: 'Phones',
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'N' },
    { AttributeName: 'manufacturer', AttributeType: 'S' }
  ],
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' },
    { AttributeName: 'manufacturer', KeyType: 'RANGE' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
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
