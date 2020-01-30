// waits till the DOM is loaded
$(() => {

  const $tweetContainer = $('#tweet-container');

  /**
   * Invokes an AJAX GET request to retrieve tweets from /tweets 
   * Then calls renderTweets(data) in a callback
   */
  const loadTweets = () =>{
    $.get('/tweets')
      .then(data =>{
        renderTweets(data, $tweetContainer);
      });
  };
  loadTweets();

  /**
   * Sumbit event added to form
   * Retrieves the value in the textarea and compares against conditionals if tweet is invalid
   * If tweet is valid, use AJAX Post request to send tweet to the server
   * Use loadTweets() to reload the page to include the new tweet
   */
  $("form").submit(function(event) {
    event.preventDefault();
    let $tweet = $('textarea').val();

    if ($tweet.length === 0) {
      $('#error').slideDown();
      $('#error').text(' Tweet Empty! Please Add Characters ');
    } else if ($tweet.length > 140) {
      $('#error').slideDown();
      $('#error').text(' Tweet Too Long! Please Remove Characters ');
    } else if ($tweet === 'null') {
      $('#error').slideDown();
      $('#error').text(' Tweet Cannot Be Null! Please Edit Tweet ');
    } else {
      $.post('/tweets', $(this).serialize())
      .done(data =>{
        $('#tweet-container').empty();
        $tweetContainer.prepend(loadTweets());
      })
      .fail(err =>{
        console.log(err);
      });
      $('#error').css('display', 'none');
      $('textarea').val('');
      $('.counter').text(140);
    }
  });
  
  /**
   * When the top down arrows are push slideToggle
   */
  $('#toggleForm').on('click', function() {
    $('.new-tweet').slideToggle();
  });

  /**
   * If the button is clicked, take the user to the top of the page
   */
  $('#top').click(function() {
    $('html').animate({scrollTop: 0}, 1000);
    $('.new-tweet').css('display', 'none');
    $('.new-tweet').slideToggle();
  });

});
  /**
   * Checks if the user scrolls past a certain point
   * If point is passed, display a button at the bottom of the screen that will take the user back to the top
   */
  $(window).scroll(function() {
    let pos = $(window).scrollTop();
    let width = window.innerWidth;
    if (pos >= 520 || (width > 1024 && pos >= 200)) {
      $('#top').css('display', 'block');
      $('#writeTweet').css('display', 'none');
    } else {
      $('#top').css('display', 'none');
      $('#writeTweet').css('display', 'block');
    }
  });

  /**
   * @param date string
   * @returns the calculated number of days, since today, the tweet was created
   */
  const calculateDays = function(date) {
    let now = new Date().getTime();
    let tweet = now - date;
    let timeInDays = 1000 * 60 * 60 * 24;
    let days = parseInt(Math.floor(tweet / timeInDays));
    if(days == 0){
      return 'Today';
    }
    return `${days} days ago`;
  };

  /**
   * @param tweetObj object
   * @returns an HTML format that contains the information from the tweetObj
   */
  const createTweetElement = function(tweetObj) {

    const $img = $('<img>').attr('src', tweetObj.user.avatars).attr('alt', 'avatar');
    const $spanName = $('<span>').text(tweetObj.user.name);
    const $spanHandle = $('<span>').text(tweetObj.user.handle);
    const $p = $('<p>').text(tweetObj.content.text);
    const $spanDays = $('<span>').text(`${calculateDays(tweetObj.created_at)}`);
    const $heart = $('<i>').addClass('fas fa-heart')
    const $retweet = $('<i>').addClass('fas fa-retweet')
    const $flag = $('<i>').addClass('fab fa-font-awesome-flag')
    
    const $footer = $('<footer>').append($spanDays, $heart, $retweet, $flag);
    const $header = $('<header>').append($img, $spanName, $spanHandle);
    const $article = $('<article>').addClass('tweet').append($header, $p, $footer);

    return $article;
  };

  /**
   * @param tweets array
   * @param mountPoint html element to mount too
   * Loops through a tweets array and calls createTweetElement(tweet) and prepends it to #tweet-container
   */
  const renderTweets = function(tweets, mountPoint) {
    tweets.forEach(tweet => {
      mountPoint.prepend(createTweetElement(tweet));
    });
  };


