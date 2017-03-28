var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index');

var app = express();

// view engine setup with ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure routing
app.use('/', routes);
app.use(bodyParser.json());


// export app as a global variable
module.exports = app;