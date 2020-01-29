/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      ($('#tweet-container').prepend(createTweetElement(tweet)));
    });
  };

  const loadTweets = () =>{
    $.get('/tweets')
      .then(data =>{
        renderTweets(data);
      });
  };
  loadTweets();


  const calculateDays = function(date) {
    let now = new Date().getTime();
    let tweet = now - date;
    let timeInDays = 1000 * 60 * 60 * 24;
    let days = parseInt(Math.ceil(tweet / timeInDays));
    return days;
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {

    const tweetFormat = `
    <article class='tweet'>
      <header>
        <img src='${tweetObj.user.avatars}' alt='avatar'></img>
        <span>${tweetObj.user.name} </span>
        <span>${tweetObj.user.handle}</span>
      </header>
      <p>${escape(tweetObj.content.text)}</p>
      <footer>
        <span>${calculateDays(tweetObj.created_at)} days</span>
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
        <i class="fab fa-font-awesome-flag"></i>
      </footer>
    </article>
    `;

    return tweetFormat;

  };


  $("form").submit(function(event) {
    event.preventDefault();

    let $tweet = $('textarea').val();
    if ($tweet.length === 0) {
      $('#error').css('display', 'block');
      $('#error').text(' ⚠️ Tweet Empty! Please Add Characters ⚠️');
    } else if ($tweet.length > 140) {
      $('#error').css('display', 'block');
      $('#error').text(' ⚠️ Tweet Too Long! Please Remove Characters ⚠️');
    } else if ($tweet === 'null') {
      $('#error').css('display', 'block');
      $('#error').text(' ⚠️ Tweet Cannot Be Null! Please Edit Tweet ⚠️');
    } else {
      $.post('/tweets', {
        text : $tweet
      },
      function(data, status) {
        console.log(data, status);
      });

      loadTweets();
      $('#tweet-container').empty();
      $('#error').css('display', 'none');
      $('textarea').val('');
      $('.counter').text(140);
    }
  });
  
  $('#toggleForm').on('click', function() {
    $('.new-tweet').slideToggle();
  });
  
  $(window).scroll(function() {
    let pos = $(window).scrollTop();
    if (pos >= 400) {
      $('#top').css('display', 'block');
      $('#writeTweet').css('display', 'none');
    } else {
      $('#top').css('display', 'none');
      $('#writeTweet').css('display', 'block');
    }
  });

  $('#top').click(function() {
    $('html').animate({scrollTop: 0}, 1000);
    $('.new-tweet').css('display', 'none');
    $('.new-tweet').slideToggle();

  });

});
