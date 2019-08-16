const express = require('express');
const session = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// ==================================================================
//                               ROUTES
// ==================================================================

// =======================================
//              POST ROUTE
// Triggers when someone tries to log in.
// =======================================
session.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser)=> {
    if (bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.currentUser = foundUser;
      res.status(201).json({
        status: 201,
        message: 'Success. Session created.'
      })
    } else {
      res.status(401).json({
        status: 401,
        message: 'Login failed.'
      })
    }

  })
});

// =======================================
//              DELETE ROUTE
//    Triggers when someone logs out.
// =======================================
session.delete('/', (req, res) => {
  req.session.destroy(()=> {
    res.status(200).json({
      status: 200,
      message: 'Logout successful. Session has been destroyed.'
    })
  })
});

module.exports = session;
