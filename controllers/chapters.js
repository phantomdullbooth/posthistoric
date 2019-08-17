// ==========================================================
//                      DEPENDENCIES
// ==========================================================
const express = require('express');
const chapter = express.Router();
const Chapter = require('../models/chapters.js');

// ==========================================================
//                        ROUTES
// ==========================================================

// ========
// CREATE
// ========
// POST
chapter.post('/', (req, res) => {
  Chapter.create(req.body, (err, newChapter) => {
    res.json(newChapter)
  })
});

// ========
// READ
// ========
// INDEX
chapter.get('/', (req, res) => {
  Chapter.find({}, (err, allChapters)=> {
    res.json(allChapters)
  })
});

// SHOW
chapter.get('/:id', (req, res) => {
  Chapter.findById(req.params.id, (err, foundChapter)=> {
    res.json(foundChapter)
  })
});

// ========
// UPDATE
// ========
// PUT
chapter.put('/:id', (req, res) => {
  Chapter.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedChapter)=> {
    res.json(updatedChapter)
  })
});

// ========
// DESTROY
// ========
// DELETE
chapter.delete('/:id', (req, res) => {
  Chapter.findByIdAndRemove(req.params.id, (err, deletedChapter) => {
    res.json(deletedChapter)
  })
});

module.exports = chapter;

// =====================================================================
//                           CURL GRAVEYARD
// =====================================================================

// POST CURL TEST
// curl -X POST -H "Content-Type: application/json" -d '{"title": "Into the Woods", "stories": []}' http://localhost:3000/rescue

// curl -X POST -H "Content-Type: application/json" -d '{"name": "Rum Tum Tugger", "species": "cat", "breed": "tom cat", "sex": "male", "image": "https://www.thesprucepets.com/thmb/sxxJ6Cdcqght2OurQWQnlFsyP04=/1920x1204/filters:no_upscale():max_bytes(150000):strip_icc()/step_4-disease-59b9b6a9d963ac0011faca31-59bae508396e5a0010365c5b.jpg", "age": 3, "adopted": true}' http://localhost:3000/rescue

// INDEX CURL TEST
// curl http://localhost:3000/rescue

// PUT CURL TEST
// curl -X PUT -H "Content-Type: application/json" -d '{"name": "Rum Tum Tugger", "species": "cat", "breed": "tom cat", "sex": "male", "image": "https://www.thesprucepets.com/thmb/sxxJ6Cdcqght2OurQWQnlFsyP04=/1920x1204/filters:no_upscale():max_bytes(150000):strip_icc()/step_4-disease-59b9b6a9d963ac0011faca31-59bae508396e5a0010365c5b.jpg", "age": 3, "adopted": false}' http://localhost:3000/rescue/5d4daa6ef062920d3bdde596

// DELETE CURL TEST
// curl -X DELETE http://localhost:3000/rescue/5d4dcc6f1af4690628a05b8a
