const Promise = require('bluebird');

const getTableItem = function(docClient, id) {
  const scanParams = {
    TableName: 'Phones',
    FilterExpression: 'id > :val',
    ExpressionAttributeValues: {
      ':val': 0
    }
  };

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
