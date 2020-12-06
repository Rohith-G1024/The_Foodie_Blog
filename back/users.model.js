const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Users = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  bio: { type: String },
  recipes: [],
});

module.exports = mongoose.model("Users", Users);
