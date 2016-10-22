$(function() {

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
    
    var d = new Date();
    var currentDate = d.getTime();
    var postDate = tweet.created_at;
    var daysAgo = Math.floor(Math.abs((currentDate - postDate) / (1000*60*60*24)));
    console.log("currentDate: ", currentDate);
    console.log("postDate: ", postDate);
    console.log("daysAgo: ", daysAgo);

    var $footer = $('<footer>');
    $footer.append($('<div>').addClass('footer-counter').text(daysAgo + ' days ago'));
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

    tweets.reverse();

    return tweets;
  }


  // *** Hijax: CODE THAT DOES AJAX WHEN POSTING A NEW TWEET ****

  $('.compose-button').on('click', function() { 
    $('.new-tweet').slideToggle("slow", function(){});
    $('textarea').focus();
  });
    // 
  // })


  $('form[action="/tweets/"]').on('submit', function (event) {
    event.preventDefault(); // stop the form from POSTING to HTTP server

    var $textarea = $('textarea', this);

    // form validation
    if ($textarea.val().length === 0) {
      $('.counter', this).text("Must enter at least one character").addClass('negative');

      return
    }

    if ($textarea.val().length > 140) {
      $('.counter', this).text("Too many characters!").addClass('negative');
      
      return
    }

    $.ajax({
      method: 'post',
      url: '/tweets/',
      data: $(this).serialize() // goes through all inputs in the form, and sets them to the format they need to be to set them as the data attributes in an ajax request.
    }).then(function successCb(data) {

        $textarea.val(""); // clear textarea

        loadTweets(function Cb (loadedTweets) {
          // Posts the newest tweet to the #tweets-container

          $('#tweets-container').prepend(loadedTweets[0]).slideDown(); // This will prepend the first element of the array received from the GET call to the server in the loadTweets function 

          $('.new-tweet').slideUp("slow", function(){});
          });

      }, function errorCb(err) {
        console.error("ERROR! ", err);
    })

  });


// **** LOAD TWEETS from server and package into DOM object ****

  function loadTweets (cb) {
    // GETS tweets from the server
    // CALLS renderTweets to package the returned data in a DOM object
    // Runs the CB that it's sent with the loaded tweets DOM object
    // ** REFACTOR THIS ** - Should probably only LOAD the data, and then use another callback that PACKAGES the returned data in a DOM object (using renderTweets)
    
    $.ajax({
      method: 'get',
      url: '/tweets',
      //data: // DON'T NEED 'data' here??
      dataType: 'json'
    }).then(function successCb(data) {
      
      loadedTweets = renderTweets(data); // this calls renderTweets so that the data that is received from our GET call is packaged in a DOM object
      cb(loadedTweets); // this calls the callback that was sent with the loadedTweets variable

    }, function errorCb(err) {
      console.error("ERROR! ", err);
    })

  }

// This calls the loadTweets function and the CB here tells it to append the loaded tweets to the $tweets-container.
  loadTweets(function (loadedTweets) { $('#tweets-container').append(loadedTweets) });

})

