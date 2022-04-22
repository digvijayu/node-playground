const express = require('express')
const bodyParser = require('body-parser');
const app = express()


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
  res.send(JSON.stringify({
    "success": true,
    message: `Welcome user ${req.body.name}`
  }))
})

app.get('/login', function (req, res) {
  res.send('Get login is not allowed')
})

app.listen(3000)