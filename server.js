const express = require('express');
const app = express();
const request = require('request');
const port = 3001;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile('public/index.html'));

app.get('/todo', (req, res) => {
  request('http://localhost:3000/todo', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.post('/todo', (req, res) => {
  const todo = {
    body: req.body.body
  };
  const headersOpt = {
    'content-type': 'application/json'
  };
  let x = {
    method: 'post',
    url: 'http://localhost:3000/todo',
    body: todo,
    headers: headersOpt,
    json: true
  };
  request.post(x, (err, response, body) => {
    res.send(response.body);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
