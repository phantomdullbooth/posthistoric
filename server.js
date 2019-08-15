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

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  console.log("something");
//   res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));