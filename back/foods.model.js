const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Foods = new Schema({
  title: { type: String },
  prep: { type: String },
  ingr: { type: String },
  steps: { type: String },
  genre: { type: String },
  auth: { type: String },
});

module.exports = mongoose.model("Foods", Foods);
