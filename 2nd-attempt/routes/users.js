var express = require('express');
var router = express.Router();
const { isAuth, isAdmin } = require('./middleware/authMiddleware');

/* GET users listing. */
router.get('/', isAuth, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
