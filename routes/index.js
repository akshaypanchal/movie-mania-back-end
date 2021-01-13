var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("success");
});


router.post('/signup', function(req, res, next) {
  console.log(req.body);

  MongoClient.connect(url, { useUnifiedTopology: true },
    function (err, db) {
      if (err) {
        throw err;
      }
      else {
        var dbo = db.db("Movie-Mania-DB");
        dbo.collection('users').insertOne(req.body);
      }
      res.status(201).send("success");


    });

});

module.exports = router;
