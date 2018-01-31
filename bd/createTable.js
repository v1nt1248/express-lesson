const Promise = require('bluebird');

const params = {
  TableName: 'Phones',
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'N' },
    { AttributeName: 'manufacturer', AttributeType: 'S' }//,
    // { AttributeName: 'model', AttributeType: 'S' },
    // { AttributeName: 'year', AttributeType: 'N' },
    // { AttributeName: 'os', AttributeType: 'S' },
    // { AttributeName: 'screenSize', AttributeType: 'S' },
    // { AttributeName: 'screenResolution', AttributeType: 'S' },
    // { AttributeName: 'ram', AttributeType: 'N' },
    // { AttributeName: 'flashMemory', AttributeType: 'N' }
  ],
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' },
    { AttributeName: 'manufacturer', KeyType: 'RANGE' }//,
    // { AttributeName: 'model' },
    // { AttributeName: 'year' },
    // { AttributeName: 'os' },
    // { AttributeName: 'screenSize' },
    // { AttributeName: 'screenResolution' },
    // { AttributeName: 'ram' },
    // { AttributeName: 'flashMemory' }
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
