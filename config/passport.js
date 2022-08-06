const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const { pool } = require("../mySQLDb");

async function verifyCallback(email, password, cb) {
  try {
    const conn = await pool.getConnection();

    const qRes = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log("qRes", qRes);

    crypto.pbkdf2(
      password,
      row.salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) return cb(err);
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: "Incorrect email or password" });
        }
        return cb(null, row);
      }
    );
    // })
  } catch (err) {
    console.log("err", err);
    return cb(err, false);
  }
}
const strategy = new LocalStrategy(verifyCallback);
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
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    10000,
    64,
    "sha512",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      const hexPass = hashedPassword.toString("hex");

      const conn = await pool.getConnection();
      try {
        await conn.query(
          "INSERT INTO users (email, hashed_password, salt) VALUES (?, ?, ?)",
          [req.body.email, hexPass, salt]
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
    }
  );
};
module.exports.register = registerUser;
