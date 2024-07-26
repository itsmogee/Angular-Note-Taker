const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
}); // Blueprint

// Mongoose needs a model to work with
module.exports = mongoose.model("Post", postSchema);
