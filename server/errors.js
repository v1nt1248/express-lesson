exports.error400 = function(req, res, next) {
  res.status(400).send(
    {
      "error": true,
      "message": "Bad Request",
      "data": null
    }
  );
};

exports.error404 = function(req, res, next) {
  res.status(404).send(
    {
      "error": true,
      "message": "Not Found",
      "data": null
    }
  );
};

exports.error500 = function(req, res, next) {
  res.status(500).send(
    {
      "error": true,
      "message": "Internal Server Error",
      "data": null
    }
  );
};
