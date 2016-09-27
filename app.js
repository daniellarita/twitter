var express = require( 'express' );
var app = express(); // creates an instance of an express application
var chalk = require('chalk');
const volleyball = require('volleyball')
app.use(volleyball)

//var bodyParser=require('body-parser')

// app.use(function (req, res, next) {
//     res.send('Welcome to the any page');
//     console.log(chalk.green("app.use general here"))
//     //next()
// })

app.use('/special',function (req, res, next) {
    // do your logging here
    res.send('Welcome to the SpEcIaL page');
    console.log(chalk.yellow('Status Code: '+res.statusCode))
    next()
})

app.get('/', function (req, res) {
  res.send('Welcome to Twitter');
  console.log(chalk.yellow('Status Code: '+res.statusCode))

});

app.get('/news', function (req, res) {
  res.send('This is the News page');
  console.log(chalk.yellow('Status Code: '+res.statusCode))

});

app.listen(3000, function () {
  console.log('Twitter app listening on port 3000!');

});
