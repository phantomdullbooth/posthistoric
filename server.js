//___________________
//Dependencies
//___________________
const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const db = mongoose.connection;
const session = require('express-session');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3008;


// Database
const PROJECT3_DB = process.env.PROJECT3_DB;
// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to Mongo
mongoose.connect(PROJECT3_DB,  { useNewUrlParser: true});


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

// use public folder for static assets
app.use(express.static('public'));

// returns middleware that only parses JSON
app.use(express.json());

// required for cookies/express-session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//___________________
// Routes
//___________________
// // sessions (logging in and out)
// const sessionController = require('./controllers/sessions.js');
// app.use('/sessions', sessionController);
//
// // users (creating a new user)
// const userController = require('./controllers/users.js');
// app.use('/users', userController);
//
// // stories (CRUD routes for stories)
// const storyController = require('./controllers/stories.js');
// app.use('/stories', storyController);
//
// // app (checks authorization)
// app.get('/app', (req, res) => {
//   if (req.session.currentUser){
//     res.json(req.session.currentUser)
//   } else {
//     res.status(401).json({
//       status: 401,
//       message: 'User is not logged in.'
//     })
//   }
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
