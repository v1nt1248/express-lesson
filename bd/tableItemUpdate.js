const Promise = require('bluebird');

const updateTableItem = function(docClient, item) {
  const queryParams = {
    TableName: 'Phones',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': item.id
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
          const params = {
            TableName: 'Phones',
            Key: {
              'id': item.id,
              'manufacturer': item.manufacturer
            },
            ExpressionAttributeNames:{
              "#yr": "year"
            },
            UpdateExpression: 'set #yr = :yr, photo = :photo, os = :os, screenSize = :screenSize, screenResolution = :screenResolution, ram = :ram, flashMemory = :flashMemory',
            ExpressionAttributeValues: {
              ':yr': item.year,
              ':photo': item.photo,
              ':os': item.os,
              ':screenSize': item.screenSize,
              ':screenResolution': item.screenResolution,
              ':ram': item.ram,
              ':flashMemory': item.flashMemory
            },
            ReturnValues: 'UPDATED_NEW'
          };
          // console.log(params);
          docClient.update(params, function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        }
      }
    });
  });
};

module.exports = updateTableItem;
