"use strict";

const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

require('dotenv').config();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const onDbConnected = (err, tweets_api) => {
  if(err) {
    console.log(err.message);
    return process.exit(1);
  }

// db.connect((dbInstance) => {
  app.use('/tweets', tweetsApi(tweets_api));
// });

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
};


db(onDbConnected);

// console.log('all the way here');

// //Callbacks
// app.get('/', (req, res) => {
//   db.getTweets((err, data) => {
//     db.getUser((err, user) => {
//       res.json({tweets: data, user: user});  
//     })
    
//   })
// });

// // Promises
// app.get('/', (req, res) => {
//   db.getTweets()
//     .then(tweets => res.json(tweets));
// })

// // Async/Await with promises
// app.get('/', async (req, res) => {
//   const tweets = await db.getTweets();
//   const user = await db.getUser();

//   const [tweets, user] = await Promise.all([
//     db.getTweets(),
//     db.getUser()]);

//   res.json(tweets);
// });



// // db.connect((dbInstance) => {
//   app.use('/tweets', tweetsApi());
// // });

// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);
// });
