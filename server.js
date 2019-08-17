//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const app = express();
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

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

// creates session cookies necessary for logging in and out
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//___________________
// Routes
//___________________
// SEED
const seed = require('./models/seed.js');
const User = require('./models/users.js');
const Story = require('./models/stories.js');
app.get('/seed', (req, res) => {
  for (let user of seed.userArray){
    User.create(user, (err, newUser)=> {
      console.log(`${user.username} has been created.`);
    })
  }

  for (let story of seed.storyArray){
    Story.create(story, (err, newStory)=>{
      console.log(`${story.text}`);
    })
  }
  res.redirect('/');
});

// USER CONTROLLER
const userController = require('./controllers/users.js');
app.use('/contributors', userController);

// STORY CONTROLLER
const storyController = require('./controllers/stories.js');
app.use('/stories', storyController);

// SESSION CONTROLLER
const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

// CHAPTER CONTROLLER
const chapterController = require('./controllers/chapters.js');
app.use('/chapters', chapterController);

// AUTHORIZATION ROUTE
app.get('/app', (req, res) => {
  if (req.session.currentUser){
    res.json(req.session.currentUser)
  } else {
    res.status(401).json({
      status: 401,
      message: "Error. Could not find currentUser."
    })
  }
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
