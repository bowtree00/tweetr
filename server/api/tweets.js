"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

const tweetsDb = require('../lib/db'); // THIS IS NEW

module.exports = function() {

  tweets.get("/", function(req, res) {
    // let tweets = db.getTweets();

    tweetsDb.getTweets( (err, allTweets) => {
      return res.json(allTweets);
    })

    // // simulate delay
    // setTimeout(() => {
    //   return res.json(tweets);
    // }, 300);
  });

  tweets.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    
    tweetsDb.saveTweet(tweet, (err, result) => {
      if (err) {
        console.log(err);
      }
      return res.send();
    });

    // db.saveTweet(tweet);
    // return res.send();

  });

  return tweets;

}
