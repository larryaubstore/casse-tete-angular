var express      = require('express');
var app          = express();
var config       = require('config');
var passport     = require('passport');
var flash        = require('connect-flash');
//var mongoose     = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB     = require('./config/database.js');

//mongoose.connect(configDB.url); 

//require('./config/passport')(passport); 

app.use(morgan('dev')); // log every request to the console
//app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

//app.use(session({ secret: 'lapiecemanquante' })); 
//app.use(passport.initialize());
//app.use(passport.session()); 
//app.use(flash()); 

require('./app/express.routes.js')(app, passport);
console.log(__dirname);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening port " + port + " ...");
