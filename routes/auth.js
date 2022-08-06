var express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const crypto = require('crypto');

var router = express.Router();
const {pool} = require('../mySQLDb');

passport.use(new LocalStrategy(function verify(email, password, cb){
  pool.get('SELECT * FROM users WHERE email = ?', [email], function(err, row){
    if (err) return cb(err)
    if (!row) return cb(null, false)

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err ) return cb(err);
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)){ return cb(null, false, { message: "Incorrect email or password"});}
      return cb(null, row);
    })
  })
}))

passport.serializeUser(function(user,cb){
  process.nextTick(function(){
    cb(null, { id: user.id, email: user.email})
  })
})

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.get('/login', function(req, res, next) {
  res.send(/*html*/`
    <div>
      <h1>Login</h1>
      <form action="/register" method="post">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  `)
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

router.get('/register', function(req, res, next) {
  res.send(/*html*/`
    <div>
      <h1>Register</h1>
      <form action="/register" method="post">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  `)
});


module.exports = router;