const Promise = require('bluebird');

const scanParams = {
  TableName: 'Phones',
  FilterExpression: 'id > :from',
  ExpressionAttributeValues: {
    ':from': 0
  }
};

const getTableItem = function(docClient, id) {
  return new Promise((resolve, reject) => {
    docClient.scan(scanParams, function (err, data) {
      if (err) {
        reject(err);
      } else {
        if (!id) {
          resolve(data.Items);
        } else {
          resolve(data.Items.find(item => item.id === Number(id)));
        }
      }
    });
  });
};

module.exports = getTableItem;
