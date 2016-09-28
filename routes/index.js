var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var chalk = require('chalk');

router.use('/', function (req, res) {
  console.log(chalk.yellow('Status Code: '+res.statusCode))
  var tweets = tweetBank.list();
  res.render('index', {title: "this is the title", people: people})
  //res.render( 'index', { tweets: tweets } );
});

module.exports = router;
