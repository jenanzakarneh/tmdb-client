const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const initialize = (passport, getUserByEmail) => {
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null)
      return done(null, false, { message: "No User with this email" });
    try {
      if (bcrypt.compareSync(password, user.password)) return done(null, user);
      else return done(null, false, { message: "Incorrect Passwoed" });
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new localStrategy({ usernameField: "email" }), authenticateUser);
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
};
module.exports = initialize;
