const express = require('express');
const bd = require('../bd');

const app = express();

const run = () => {
  app.get('/', function(req, res) {
    bd.createTable('Phones')
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });

    // res.status(200).send("Hello World!");
  });

  app.listen(3000);
  console.log('The server start at 127.0.0.1:3000');
};

exports.run = run;
