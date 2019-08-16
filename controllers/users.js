const mongoose = require('mongoose');
const express = require('express');
const users = express.Router();
const User = require('..models/users.js');
const bcrypt = require('bcrypt');

// ========
//  ROUTES
// ========

// INDEX
// When a user logs in, app.js will request a list of all the user objects so it can compare the username/password input to what's in the database.
users.get('/', (req, res) => {
  User.find({}, (err, allUsers) => {
    res.json(allUsers)
  })
});

// POST
// When a user signs up, app.js will hash the password and add the user to the database.
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, newUser)=> {
    req.session.currentUser = newUser;
    res.status(201).json({
      status: 201,
      message: 'User created.'
    })
  })
});

module.exports = users;
