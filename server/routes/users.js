const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const passport = require("passport");
const utils = require("../lib/utils");

// TODO
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({ success: true, msg: "you are authorized" });
  }
);

// TODO
router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json({
            success: false,
            error: "could not find user rigestered for this email",
          });
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const tokenOnject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          user: user,
          token: tokenOnject.token,
          expiresIn: tokenOnject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, error: "You entered wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// TODO
router.post("/register", function (req, res, next) {
  console.log("request : " + req.body);
  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    hash: hash,
    salt: salt,
  });
  newUser
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user);
      res.status(200).json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) =>
      res.status(409).json({
        success: false,
        error: "this email is already registered",
      })
    );
});

module.exports = router;
