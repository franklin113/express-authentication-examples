var express = require('express');
const passport = require('passport');
const { registerUser } = require('../config/passport');
const {isAdmin, isAuth} = require('../middleware/authMiddleware');
var router = express.Router();
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


router.get('/login', function(req, res, next) {
  res.send(/*html*/`
    <div>
      <h1>Login</h1>
      <form action="/login/password" method="post">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  `)
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/login-success',
  failureRedirect: '/login?error'
}))

router.get('/signup', function(req, res, next) {
  res.send(/*html*/`
    <div>
      <h1>Register</h1>
      <form action="/signup" method="post">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  `)
});

router.post('/signup', function(req, res, next) {
  registerUser(req, res, next);
});

router.get('/protected-route', isAuth, (req, res, next) => {
  res.send('You made it to the route.');
});
router.get('/login-success', (req, res, next) => {
  res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});
module.exports = router;