const bd = require('../bd');

exports.createBD = function(req, res, next) {
  bd.createTable(bd.dataBase)
    .then(data => {
      res.status(200).send(
        {
          "error": false,
          "message": "Created table",
          "data": data
        }
      );
    })
    .catch(err => {
      res.status(500).send(
        {
          "error": true,
          "message": "Unable to create table." + JSON.stringify(err, null, 2),
          "data": null
        }
      );
    });
};

exports.deleteBD = function(req, res, next) {
  bd.deleteTable(bd.dataBase)
    .then(data => {
      res.status(200).send(
        {
          "error": false,
          "message": "Delete table",
          "data": data
        }
      );
    })
    .catch(err => {
      res.status(500).send(
        {
          "error": true,
          "message": "Unable to delete table" + JSON.stringify(err, null, 2),
          "data": null
        }
      );
    });
};

exports.addItem = function(req, res, next) {
  const data = req.body;
  bd.addTableItem(bd.table, data)
    .then(data => {
      res.status(200).send(
        {
          "error": false,
          "message": "Added item",
          "data": data
        }
      );
    })
    .catch(err => {
      res.status(500).send(
        {
          "error": true,
          "message": "Unable to add item." + JSON.stringify(err, null, 2),
          "data": null
        }
      );
    });
};

exports.delItem = function(req, res, next) {
  const id = req.params.id;
  bd.addTableItem(bd.table, id)
    .then(data => {
      res.status(200).send(
        {
          "error": false,
          "message": "Delete item succeeded",
          "data": data
        }
      );
    })
    .catch(err => {
      res.status(500).send(
        {
          "error": true,
          "message": "Unable to delete item." + JSON.stringify(err, null, 2),
          "data": null
        }
      );
    });
};

exports.updateItem = function(req, res, next) {
  const data = req.body;
  bd.updateTableItem(bd.table, data)
    .then(data => {
      res.status(200).send(
        {
          "error": false,
          "message": "Update item succeeded",
          "data": data
        }
      );
    })
    .catch(err => {
      res.status(500).send(
        {
          "error": true,
          "message": "Unable to update item." + JSON.stringify(err, null, 2),
          "data": null
        }
      );
    });
};

exports.getItem = function(req, res, next) {
  const id = req.params.id;
  console.log(`GET. Params: ${id}`);
  bd.getTableItem(bd.table, id)
    .then(data => {
      res.status(200).send(
        {
          "error": false,
          "message": "Get data succeeded",
          "data": data
        }
      );
    })
    .catch(err => {
      res.status(500).send(
        {
          "error": true,
          "message": "Unable to get data." + JSON.stringify(err, null, 2),
          "data": null
        }
      );
    });
};
