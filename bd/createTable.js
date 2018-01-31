const Promise = require('bluebird');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-central-1',
  endpoint: 'https://dynamodb.eu-central-1.amazonaws.com'
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: '',
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


const createTable = function(tableName) {
  params.TableName = tableName;
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
