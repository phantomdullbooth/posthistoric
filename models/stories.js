const mongoose = require('mongoose');

const storiesSchema = new mongoose.Schema({
  text: String,
  author: String,
  chapter: String,
  date: {type : Date, default: Date.now}
});

const Stories = mongoose.model('Stories', storiesSchema);

module.exports = Stories;
