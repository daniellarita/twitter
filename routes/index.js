var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var chalk = require('chalk');
router.use(express.static('public'));

router.get('/', function (req, res, next) {
  console.log(chalk.yellow('Status Code: '+res.statusCode))
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list } );
});

router.get('/stylesheets/style.css', function (req, res){
	res.sendFile(path.join(__dirname,'../public/stylesheets/style.css'));
})

module.exports = router;
