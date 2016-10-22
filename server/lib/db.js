"use strict";

// const initialTweets = require("./tweets");

// const db = { tweets: initialTweets };

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

// ANOTHER WAY TO DO THIS:
// var mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/'
// 
console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);


module.exports = (done) => MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log('Could not connect! Unexpected error. Details below.');
    //throw err; // This won't work. If I throw in an async context it will go into the void - its not caught on separate threads
    return done(err);
  }

  console.log('Connected to the database!');

  const tweetsCollection = db.collection("tweets");

  const tweets_api = {};
  tweets_api.saveTweet = function saveTweet (data, cb) {
    console.log("used saveTweet");
    return tweetsCollection.insertOne(data, cb);
  };

  tweets_api.getTweets = function getTweets (cb) {
    console.log("used getTweets");
    return tweetsCollection.find({}).toArray(cb);
  };

  done(null, tweets_api) // note, in NODE callbacks are allways (error, data). If not passing an error here, then just put null
});




// const Tweets = {};
// module.exports = Tweets;

// MongoClient.connect(MONGODB_URI, (err, db) => {

//   if (err) {
//     console.log('Could not connect! Unexpected error. Details below.');
//     throw err;
//   }

//   console.log('Connected to the database!');

//   let tweetsCollection = db.collection("tweets");

//   Tweets.saveTweet = function saveTweet (data, cb) {
//     console.log("used saveTweet");
//     return tweetsCollection.insertOne(data, cb);
//   };

//   Tweets.getTweets = function getTweets (cb) {
//     console.log("used getTweets");
//     return tweetsCollection.find({}).toArray(cb);
//   };
// })





// const dbMethods = {

//   saveTweet: (data) => {
//     db.tweets.push(data);
//     return true;
//   },

//   getTweets: () => {
//     return db.tweets.sort(function(a, b) { return a.created_at - b.created_at });
//   }

// }

// module.exports = {

//   connect: (onConnect) => {

//     onConnect(dbMethods);

//   }

// }
