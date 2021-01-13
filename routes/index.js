var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');

var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("success");
});


router.post('/signup', function (req, res, next) {
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


router.post("/login", function (req, res, next) {

  let email = req.body.email;
  let password = req.body.password;



  MongoClient.connect(url, { useUnifiedTopology: true },
    function (err, db) {
      if (err) {
        throw err;
      }
      else {
        var dbo = db.db("Movie-Mania-DB");
        dbo.collection('users').find({ $and: [{ "email": email }, { "password": password }] }).toArray(function (err, result) {
          if (err) {
            throw err;
          }
          else {
            // res.status(200).json({ data: result }););
            if (result.length > 0) {
              console.log("function called");

              const token = jwt.sign(
                // payload
                { user: email },
                // sercret key
                "dreams",
                // header 
                {
                  algorithm: "HS256",
                  expiresIn: 3600   //seconds
                }
              )

              // set it the response's cookie
              res.json({ 'AuthToken' : token, 'maxAge' :  3600  });
              // res.redirect('/shopping');
              res.send("success");

            }

            else {
              res.send("Invalid login details");
            }

            // res.status(200);
            res.end();
            db.close();
          }
        });
      }
    });

});

module.exports = router;
