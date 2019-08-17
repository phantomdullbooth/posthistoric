const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: String,
  stories: Array
});

const Chapter = mongoose.model('Chapters', chapterSchema);

module.exports = Chapter;
