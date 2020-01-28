/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const calculateDays = function(date){
    let now = new Date().getTime();
    let tweet = now - date;
    let timeInDays = 1000 * 60 * 60 * 24;
    let days = parseInt(Math.floor(tweet / timeInDays));
    return days;
  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      ($('#tweet-container').prepend(createTweetElement(tweet)));
    });
  };

  $( "form" ).submit(function( event ) {
    event.preventDefault();
    let $tweet = $('textarea').val();

    if($tweet.length === 0 ){
      alert('Invalid Tweet! Tweet too short')
    }
    else if($tweet.length > 140){
      alert('Tweet Too Long!')
    }
    else if($tweet === 'null'){
      alert('Tweet Cannot Be Null')
    }
    else{
      $.post('/tweets', {
        text : $tweet
      },
      function(data, status){
        console.log(data, status);
      })
      loadTweets();
      $('textarea').val('');
      $('.counter').text(140);
    }
  });
  $('#toggleForm').on('click', function(){
    $('.new-tweet').slideToggle()
  })
  
  $(window).scroll(function(){
    var pos = $(window).scrollTop();
    if(pos >= 400){
      $('#top').css('display', 'block')
      $('#writeTweet').css('display', 'none')
    }
    else{
      $('#top').css('display', 'none')
      $('#writeTweet').css('display', 'block')
    }
  })

  $('#top').click(function(){
    $('html').animate({scrollTop: 0}, 1000);
    $('.new-tweet').slideToggle();

  })

  const loadTweets =() =>{
    $.get('/tweets')
    .then(data =>{
      renderTweets(data);
    })
  }
  
  
  loadTweets();


});
