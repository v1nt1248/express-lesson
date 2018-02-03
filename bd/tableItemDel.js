const Promise = require('bluebird');

const delTableItem = function(docClient, id) {
  // console.log(`Delete item with id ${id}`);
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
        const removableItem = data.Items.find(item => item.id === id);
        if (removableItem) {
          const params = {
            TableName: 'Phones',
            Key: {
              'id': removableItem.id
            }
          };
          docClient.delete(params, function (err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        } else {
          reject({message: `Item with id ${id} isn't found.`})
        }
      }
    });
  });
};

module.exports = delTableItem;
