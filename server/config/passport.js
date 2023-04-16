// const fs = require("fs");
// const path = require("path");
const User = require("mongoose").model("User");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

// const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
// const PUB_KEY = fs.readFileSync(pathToKey, "utf8");
require('dotenv').config()
// TODO
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  
};
const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err, false));
});

// TODO
module.exports = (passport) => {
  passport.use(strategy);
};
