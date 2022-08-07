// import the register user function from auth.js
// import router
const router = require('express').Router();
const { registerUser } = require('../config/passport');

// login route
router.get('/login', (req, res) => {
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
})

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?error'
}))

// register route
router.get('/register', (req, res) => {
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
})

router.post('/register', (req, res, next) => {
  registerUser(req, res, next);
})

// logout route
router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/');
})

module.exports = router;