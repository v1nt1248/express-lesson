const errors = require('./errors');
const api = require('./api');

module.exports = function(router) {
  console.log(router);
  router.get('/api/create', api.createBD);

  router.get('/api/phone/:id', (req, res, next) => {
    console.log(req.params.id);
    res.status(200).send(
      {
        "error": false,
        "message": `It's OK`,
        "data": [{id: 0, phone: 'Samsung'}, {id: 1, phone: 'Apple'}]
      }
    );
  });

  router.get('/*', errors.error400);

  router.post('/api/phone', (req, res, next) => {
    console.log(req.body);
    res.status(200).send(
      {
        "error": false,
        "message": `It's OK`,
        "data": []
      }
    );
  });
};
