var express = require('express');
var router = express.Router();
const { isAuth, isAdmin } = require('../middleware/authMiddleware');


/* GET home page. */
router.get('/',isAuth, function(req, res, next) {
  res.send(/*html*/`
    <h1>Homepage</h1>
    <a href="/logout">Logout</a>
  `)
});

module.exports = router;
