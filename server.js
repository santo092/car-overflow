require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan'); // used to see requests
const db = require('./models');
const PORT = process.env.PORT || 3001;

const isAuthenticated = require("./config/isAuthenticated");
const auth = require("./config/auth");

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', {useNewUrlParser: true, useCreateIndex: true})
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));


// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  auth
    .logUserIn(req.body.email, req.body.password)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err));
});

// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id).then(data => {
    if(data) {
      res.json(data);
    } else {
      res.status(404).send({success: false, message: 'No user found'});
    }
  }).catch(err => res.status(400).send(err));
});

app.post('/api/add/:username', (req, res) => {
  db.Question.create({
    title: req.body.title,
    body: req.body.body,
    username: req.params.username
  }).then(dbQuestion => res.json(dbQuestion))
  .catch(err => res.json(err));
});

app.get("/api/add", (req, res) => {
  db.Question
  .find({}).sort({date: -1})
  .populate("reply")
  .then(dbQuestion => res.json(dbQuestion))
  .catch(err => res.json(err));
}); 

app.get("/api/add/:id", (req, res) => {
  db.Question
  .findById({ _id: req.params.id})
  .populate("reply")
  .then(dbQuestion => res.json(dbQuestion))
  .catch(err => res.json(err));
})

// make a GET route 
// that finds a all questions by title
//({"honda"}) fuzzy search ({/honda fit/gi})
app.get("/api/question/:title", (req, res) =>{
  var re = new RegExp(req.params.title, "gi");

  db.Question
  .find({title: re})
  .then(dbQuestion => res.json(dbQuestion))
  .catch(err => res.json(err));



})

app.post("/api/reply/:id", (req, res) => {
  db.Reply.create(req.body)
    .then(dbReply => {
      return db.Question.findOneAndUpdate({ _id: req.params.id}, { $push: {reply: dbReply._id} }, { new: true});
    })
    .then(dbQuestion => {
      res.json(dbQuestion);
    })
  .catch(err =>  res.json(err));
})

app.get("/api/reply", (req, res) => {
  db.Reply
  .find({})
  .then(dbReply => res.json(dbReply))
  .catch(err => res.json(err))
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('/', isAuthenticated /* Using the express jwt MW here */, (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
