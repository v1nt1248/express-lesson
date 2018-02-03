const Promise = require('bluebird');

const addTableItem = function(docClient, phone) {
  const scanParams = {
    TableName: 'Phones',
    FilterExpression: 'id > :val',
    ExpressionAttributeValues: {
      ':val': 0
    }
  };
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
        const params = {
          TableName: 'Phones',
          Item: phone
        };
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
