var express = require( 'express' );
var app = express(); // creates an instance of an express application

app.get('/', function (req, res) {
  res.send('Welcome to Twitter');
});

app.get('/news', function (req, res) {
  res.send('This is the News page');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
