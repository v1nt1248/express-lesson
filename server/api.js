const bd = require('../bd');

exports.createBD = function(req, res, next) {
  bd.createTable(bd.dataBase)
    .then(data => {
      res.status(200).send(
        {
          "error": false,
          "message": null,
          "data": data
        }
      );
    })
    .catch(err => {
      res.status(500).send(
        {
          "error": true,
          "message": "Internal Server Error",
          "data": null
        }
      );
    });
};
