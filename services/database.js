/**
* @description REST Api for the A team
* @author Adrián Sánchez <contact@imaginexyz.com>
*/

var mongo = require('mongodb');
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/homelux';


mongo.MongoClient.connect(uristring, function(err, database) {
    if(!err) {
        db = database;
        console.log('Connected to the "Homelux_Database" database');
    }
    else{
        console.log(404, 'Error Connecting to the "Homelux_Database" database');
    }
});


exports.newData = function(req,res, team) {
    db.collection(team).insert(req.query, function(err, doc){
        if(err) res.send(400, err);
        res.send(200, doc.ops[0]);
    });
}

exports.getData = function(req,res, team) {
    db.collection(team).findOne({}, function(err, doc){
        if(err) res.send(400, err);
        res.send(200, doc);
    });
}
