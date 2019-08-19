const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Stories = require('../models/stories.js');
const bcrypt = require('bcrypt');

/// FIND ALL STORIES ///
router.get('/', (req, res) => {
Stories.find({}, (err, foundStories) => {
  res.json(foundStories);
  });
});

/// DELETE A STORY ///
router.delete('/:id', (req, res) => {
  Stories.findByIdAndRemove(req.params.id, (err, deletedStory) => {
    res.json(deletedStory);
  });
});

/// DELETE A CHAPTER ///
router.delete('/chapter/:chapter', (req, res) => {
  Stories.deleteMany({chapter: req.params.chapter}, (err, deletedStories)=> {
    res.json(deletedStories)
  })
});

/// EDIT A STORY ///
router.put('/:id', (req, res) => {
  Stories.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedStory) => {
    res.json(updatedStory);
  });
});

/// CREATE NEW STORY ///
router.post('/', (req, res) => {
  Stories.create(req.body, (err, createdStory) => {
    res.json(createdStory);
  });
});


module.exports = router;
