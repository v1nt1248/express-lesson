const Promise = require('bluebird');

const params = {
  TableName: 'Phones',
  Item: {}
};

const queryParams = {
  TableName: 'Phones',
  KeyConditionExpression: 'maxId = max :id'
};

const getTableItem = function(docClient, id) {
  return new Promise((resolve, reject) => {
    docClient.query(queryParams, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = getTableItem;
