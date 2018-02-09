const Promise = require('bluebird');

const updateTableItem = function(docClient, item) {
  const queryParams = {
    TableName: 'Phones',
    KeyConditionExpression: 'id = :val',
    ExpressionAttributeValues: {
      ':val': item.id
    }
  };

  return new Promise((resolve, reject) => {
    docClient.query(queryParams, function(err, data) {
      if (err) {
        reject(err);
      } else {
        if (data.Items.length === 0) {
          reject({message: `Item with id ${item.id} isn't found.`})
        } else {
          let updateExpression = 'set';
          let expressionAttributeValues = {};
          for (const key of Object.keys(item)) {
            if (key !== 'id') {
              updateExpression = updateExpression + (key !== 'year' ? ` ${key} = :${key},` : ' #yr = :yr,');
              expressionAttributeValues[(key !== 'year' ? `:${key}` : ':yr')] = item[key];
            }
          }
          updateExpression = updateExpression.slice(0, -1);
          const params = {
            TableName: 'Phones',
            Key: {
              'id': item.id
            },
            // ExpressionAttributeNames: {"#yr": "year"},
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'UPDATED_NEW'
          }
          if ('year' in item) {
            params.ExpressionAttributeNames = {"#yr": "year"};
          }
          console.log(params);
          docClient.update(params, function(err, reply) {
            if (err) {
              reject(err);
            } else {
              resolve(item);
            }
          });
        }
      }
    });
  });
};

module.exports = updateTableItem;
