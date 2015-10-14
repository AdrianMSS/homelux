/**
* @description Module and archives used by the server
* @author Adrián Sánchez <sesamaua@gmail.com>
*/

//Required Modules
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

//REST APIS
var  organizationImagine = require('./services/imagine'),
    database = require('./services/database');

var app = express();
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());

app.use(express.static(__dirname + '/webpage'));

app.get('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/homelux', function(res,req){
  database.newData(res,req,'homelux');
});
app.get('/homelux', function(res,req){
  database.getData(res,req,'homelux');
});
app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');