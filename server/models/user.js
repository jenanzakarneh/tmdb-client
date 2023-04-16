const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: String,
    salt: String,
    wishlist: { type: Array },
    watched: { type: Array },
  },
  { collection: "user-data" }
);

module.exports = mongoose.model("User", userSchema);

// module.exports = User;
