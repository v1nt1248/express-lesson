const errors = require('./errors');
const api = require('./api');

module.exports = function(router) {
  router.get('/api/create', api.createBD);
  router.get('/api/delete', api.deleteBD);

  router.get('/api/phone', api.getItem);
  router.get('/api/phone/:id', api.getItem);
  router.get('/*', errors.error400);

  router.post('/api/phone', api.addItem);
  router.delete('/api/phone/:id', api.delItem);
  router.put('/api/phone', api.updateItem);
};
