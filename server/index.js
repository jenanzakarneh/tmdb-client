require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/full-mern-stack-video");
app.get("/", (req, res) => {
  res.send("hello world ");
});

app.post("/api/register", async (req, res) => {
  try {
    //here some code for hashing the password before store in DB
    // const hashedPassword = bcrypt.hash(req.body.password, 10);
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds); //another catch
    // const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log("user added =", user);
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicated Email" });
  }
  console.log(req.body);
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  console.log("body", req.body);
  console.log("user", user);
  if (user) {
    const match = await bcrypt.CompareHashAndPassword(
      req.body.password,
      user.password
    );

    if (match) {
      //create token and send it
      const token = jwt.sign(
        {
          name: req.body.name,
          email: req.body.email,
        },
        process.env.ACCESS_TOKEN_SECRET
        // { expiresIn: "20m" }
      );
      res.json({ status: "ok", user: token });
    } else res.json({ status: "Incorrect password!", user: false });
  } else {
    res.json({ status: "No user for this email!", user: false });
  }

  console.log(req.body);
});
const verify = (req, res, next) => {
  const authHeaders = req.headers.authorization; //when we send a request we must send the token in the header as (autherization)
  if (authHeaders) {
    const token = authHeaders.split(" ")[1]; //atheHeaders={"Bearer",token}
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json("Invalid token");
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
app.delete("/api/delete/:email", verify, (req, res) => {
  if (req.params.email === req.user.email)
    res.status(200).json("user successfully deleted ");
  else
    res.status(403).json("you cant delete any account without authentication");
});
app.post("/api/addToWishist", verify, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  const movie = req.body.movie; //handel id the user didn't send body with the request
  if (!movie) res.status(403).json("Missing body");
  const id = user._id;
  await User.updateOne({ _id: id }, { $push: { wishlist: movie } });
  if (!user) res.status(401).json("Not autherized");
  else res.status(200).json(await User.findById(user.id));
});

app.post("/api/markAsWatched", verify, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  const movie = req.body.movie; //handel id the user didn't send body with the request
  if (!movie) res.status(403).json("Missing body");
  const id = user._id;
  await User.updateOne({ _id: id }, { $push: { watched: movie } });
  if (!user) res.status(401).json("Not autherized");
  else return res.status(200).json(await User.findById(user.id));
});
app.get("/api/wishlist", verify, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  res.status(200).json(user.wishlist);
});
app.get("/api/watched", verify, async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
  });
  res.status(200).json(user.watched);
});
var port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log("App is listening on port " + port + "!");
});
