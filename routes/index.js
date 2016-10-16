var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var chalk = require('chalk');
router.use(express.static('public'));
var bodyParser = require('body-parser')
const client=require('../db/index.js')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/tweets', function(req, res) {
  client.query(`INSERT into users (name) VALUES('${req.body.name}') returning id`,function(err,result){
    var uId = parseInt(result.rows[0].id);
    client.query(`INSERT into tweets(userid,content) VALUES(${uId},'${req.body.text}') returning id`,function(err, result){
      console.log(result);
    });
  });
  res.redirect('/');
});

// router.get('/', function (req, res, next) {
//   console.log(chalk.yellow('Status Code: '+res.statusCode))
//     const tweets = client.query('select u.name,u.id, t.content from users u join tweets t on u.id=t.userid', function (err, result) {
//     if (err) return next(err); // pass errors to Express
//     var tweets = result.rows;
//     res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
//   });
// });

router.get('/', function(req, res) {
  const tweets = client.query('select u.name,u.id, t.content from users u join tweets t on u.id=t.userid', function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweets = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });
});

router.get('/users/:name', function(req, res) {
  console.log(req.params.name, req.params.name.toString())
  const tweets = client.query(`select u.name, t.content from users u join tweets t on u.id=t.userid where u.name='${req.params.name}'`, function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweets = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });
});

router.get('/tweets/:id', function(req, res) {
  console.log(req.params.id)
  const tweets = client.query(`SELECT * FROM tweets where id=${parseInt(req.params.id)}`, function (err, result) {
    console.log(result);
    if (err) return next(err); // pass errors to Express
    var tweets = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });
});


router.get('/stylesheets/style.css', function (req, res){
	res.sendFile(path.join(__dirname,'../public/stylesheets/style.css'));
})



module.exports = router;
