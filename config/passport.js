const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const { pool } = require("../mySQLDb");
const {genPassword, validPassword} = require('../lib/passwordUtils'); 


async function verifyCallback(email, password, cb) {
  try {
    const conn = await pool.getConnection();

    const [rows, fields] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const row = rows[0];
    console.log("rows", row);
    console.log('input data: ' , email, password)

    const isValid = validPassword(password, row.hashed_password, row.salt);
    if (isValid) {
      return cb(null, row)
    }
    else {
      return cb(null, false)
    }
  } catch (err) {
    console.log("err", err);
    return cb(err, false);
  }
}
const customFields = {
  usernameField: "email",
  passwordField: "password",
}

const strategy = new LocalStrategy(customFields,verifyCallback);
passport.use(strategy);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const registerUser = async (req, res, next) => {

  const { salt, hash } = genPassword(req.body.password);

    const conn = await pool.getConnection();
    try {
      await conn.query(
        "INSERT INTO users (email, hashed_password, salt) VALUES (?, ?, ?)",
        [req.body.email, hash, salt]
      );

      conn.release();

      var user = {
        id: this.lastID,
        email: req.body.email,
      };
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    } catch (err) {
      conn.release();
      return next(err);
    }
};
module.exports.registerUser = registerUser;
