var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var chalk = require('chalk');
router.use(express.static('public'));
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

router.get('/', function (req, res, next) {
  console.log(chalk.yellow('Status Code: '+res.statusCode))
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets , showForm: true});
//  res.render('index', {showForm: true})
});
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list , showForm: true} );
});
router.get('/tweets/:id', function(req, res) {
  var id = req.params.id;
  var list = tweetBank.find( {id: id} );
  res.render( 'index', { tweets: list , showForm: false} );
});


router.get('/stylesheets/style.css', function (req, res){
	res.sendFile(path.join(__dirname,'../public/stylesheets/style.css'));
})

module.exports = router;
