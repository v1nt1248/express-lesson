const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const routes = require('./routes');

const run = () => {
  app.use(function(req, res, next) {
    // console.log(`CORS. Method: ${req.method}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']);
    res.header("Allow", "GET,HEAD,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/', router);
  routes(router);

  app.listen(3000);
  console.log('The server start at 127.0.0.1:3000');
};

exports.run = run;
