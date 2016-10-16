var express = require( 'express' );
var app = express(); // creates an instance of an express application
var chalk = require('chalk');
var nunjucks=require('nunjucks')
nunjucks.configure('views'); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true })

var routes=require('./routes/index.js')
app.use('/',routes)

app.listen(3000, function () {
  console.log('Twitter app listening on port 3000!');

});
