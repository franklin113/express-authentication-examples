var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(/*html*/`
    <h1>Homepage</h1>
    <a href="/logout">Logout</a>
  `)
});

module.exports = router;
