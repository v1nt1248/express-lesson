const express = require('express');

function start(port) {
  const app = express();

  app.get('/api', (req, res) => {
    res.send('Hello');
  });

  app.listen(port);
  console.log(`The server start at 127.0.0.1:${port}`)
}

exports.start = start;
