const Promise = require('bluebird');

const params = {
  TableName: 'Phones'
};

const deleteTable = function(dynamodb) {
  return new Promise((resolve, reject) => {
    dynamodb.deleteTable(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = deleteTable;
