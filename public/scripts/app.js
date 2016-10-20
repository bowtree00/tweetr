/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var data = [
  {
    "user": {
      "name": "Newton <script>alert(\"here!\")</script>",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function createTweetElement(tweet) {

  // NOTE: using .text() method, which will escape potentially insecure text (e.g., text with HTML tags or scripts in it), and thus protect against Cross-Site Scripting
  
  var avatar = tweet.user.avatars.small;
  var userName = tweet.user.name;
  var handle = tweet.user.handle;

  var $header = $("<header>"); // NOTE: This creates a header DOM object, not linked to anything. 
  // The following code appends things to the header object.
  $header.append($('<img src="' + avatar + '">').addClass('avatar')); 
  $header.append($('<h2>').text(userName));
  $header.append($('<div>').text(handle));

  var content = tweet.content.text;
  var $body = $('<div>').addClass('body').text(content);

  // figure out how many days ago the post was made
  var postDate = tweet.created_at;
  var d = new Date();
  var currentDate = d.getTime();
  var daysAgo = Math.floor((d - postDate) / (1000*60*60*24));

  var $footer = $('<footer>');
  $footer.append($('<div>').text(daysAgo + ' days ago'));
  var $icons = $('<div>').addClass('footer-icons');
  
  ["/images/flag.png", "/images/recycle.png", "/images/heart.png"].forEach(function(image) {
    $icons.append($('<img src="' + image + '">').addClass('avatar'));
  });

  $footer.append($icons);

  var $tweet = $("<article>").addClass("tweet");
  $tweet.append($header);
  $tweet.append($body);
  $tweet.append($footer);

  return $tweet;
}


function renderTweets (tweets_data) {
   // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

  tweets = [];

  tweets_data.forEach(function(element) {
    var $tweet = createTweetElement(element);
    tweets.push($tweet);
  });

  return tweets;
}


// // Test / driver code (temporary)

// $('#tweets-container').append(createTweetElement(data[0])); 
$('#tweets-container').append(renderTweets(data)); 

})

