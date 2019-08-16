const mongoose = require('mongoose');

const storiesSchema = new mongoose.Schema({
  text: String,
  author: String,
  date: {type : Date, default: Date.now} 
});

const Bookmarks = mongoose.model('Bookmarks', bookmarksSchema);

module.exports = Bookmarks;
