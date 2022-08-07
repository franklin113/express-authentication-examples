var express = require('express');
var router = express.Router();
const { isAuth, isAdmin } = require('../middleware/authMiddleware');




/* GET home page. */
router.get('/',  isAuth, function(req, res, next) {
  res.send(/*html*/`
  <h1>Express</h1>
  <p>You are authenticated</p>
  <a href="/logout">Logout</a>"
  `);
});

module.exports = router;
