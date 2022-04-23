const express = require('express')
const bodyParser = require('body-parser');
const app = express()

let USERS = {};


app.use(express.json({
  type: ['application/json', 'text/plain']
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/login', function (req, res) {
  console.log('req', req.headers);
  console.log('req', req.body);


  if (req.body.name === "Divya") {
    res.send(JSON.stringify({
      "success": true,
      message: `Welcome user ${req.body.name}`,
      name: req.body.name
    }))
  }
  else {
    res.send(JSON.stringify({
      "success": false,
      message: `${req.body.name} is not a valid name.`
    }))
  }


})
// ---------------

app.get('/user', function (req, res) {
  res.send(JSON.stringify(Object.values(USERS)))
});

app.get('/user/:id', function (req, res) {
  const id = req.params.id;

  if (USERS[id]) {
    res.send(JSON.stringify(USERS[id]))
  }
  else {
    res.status(404).send();
  }
});

app.post('/user', function (req, res) {
  const id = +(new Date());
  const { username, email } = req.body;

  const user = {
    id,
    username,
    email
  }

  USERS[id] = user;
  res.send(JSON.stringify(user))
});

app.put('/user/:id', function (req, res) {
  const id = req.params.id;
  const user = USERS[id];

  if (!user) {
    res.status(404);
    return;
  }

  user.username = req.body.username;
  user.email = req.body.email;
  res.send(JSON.stringify(user));
});

app.delete('/user/:id', function (req, res) {
  const id = req.params.id;

  if (!USERS[id]) {
    res.status(404).send();
    return;
  }

  delete USERS[id];
  res.send(JSON.stringify({ successful: true }));
});

app.listen(3001)