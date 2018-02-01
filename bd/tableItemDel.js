const Promise = require('bluebird');

const params = {
  TableName: 'Phones',
  Key: {}
};

const scanParams = {
  TableName: 'Phones',
  FilterExpression: 'id > :from',
  ExpressionAttributeValues: {
    ':from': 0
  }
};

const delTableItem = function(docClient, id) {
  // console.log(`Delete item with id ${id}`);
  return new Promise((resolve, reject) => {
    docClient.scan(scanParams, function(err, data) {
      if (err) {
        reject(err);
      } else {
        const removableItem = data.Items.find(item => item.id === id);
        if (removableItem) {
          params.Key = {
            'id': removableItem.id,
            'manufacturer': removableItem.manufacturer
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
