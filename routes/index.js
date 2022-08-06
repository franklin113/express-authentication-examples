var express = require('express');
var router = express.Router();
const { isAuth, isAdmin } = require('../middleware/authMiddleware');




/* GET home page. */
router.get('/',  isAuth, function(req, res, next) {
  res.render('home.html', { title: 'Express' });
});

module.exports = router;
