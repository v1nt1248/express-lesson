const Promise = require('bluebird');

const params = {
  TableName: 'Phones',
  Item: {}
};

const scanParams = {
  TableName: 'Phones',
  FilterExpression: 'id > :from',
  ExpressionAttributeValues: {
    ':from': 0
  }
};

const addTableItem = function(docClient, phone) {
  return new Promise((resolve, reject) => {
    docClient.scan(scanParams, function(err, data) {
      if (err) {
        reject(err);
      } else {
        const lastItem = data.Items.length === 0 
          ? {id: 0}
          : data.Items.reduce((max, item) => {
              return (item.id > max) ? item : max;
            });
        phone.id = lastItem.id + 1;
        params.Item = phone;
        docClient.put(params, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(params.Item);
          }
        });
      }
    });
  });
};

module.exports = addTableItem;
