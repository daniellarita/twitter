var express = require( 'express' );
var app = express(); // creates an instance of an express application
var chalk = require('chalk');
var nunjucks=require('nunjucks')
nunjucks.configure('views'); // point nunjucks to the proper directory for templates
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true })
const volleyball = require('volleyball')
app.use(volleyball)
var routes=require('./routes/index.js')
app.use('/',routes)

//var bodyParser=require('body-parser')

// app.use(function (req, res, next) {
//     res.send('Welcome to the any page');
//     console.log(chalk.green("app.use general here"))
//     //next()
// })

// app.use('/special',function (req, res, next) {
//     // do your logging here
//     res.send('Welcome to the SpEcIaL page');
//     console.log(chalk.yellow('Status Code: '+res.statusCode))
//     next()
// })
// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// //res.render( 'index', {title: 'Hall of Fame', people: people} );
// app.get('/', function (req, res) {
//   res.render('index', {title: "this is the title", people: people})
//   console.log(chalk.yellow('Status Code: '+res.statusCode))
//
// });

app.listen(3000, function () {
  console.log('Twitter app listening on port 3000!');

});

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});
