/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObj){
  const tweet = `
  <header>
  <span>${tweetObj.user.name} ${tweetObj.user.avatars}</span>
  <span>${tweetObj.user.handle}</span>
  </header>
  <p>${tweetObj.content.text}</p>
  <footer>
  <span>${tweetObj.created_at}</span>
  </footer>
  `
  return tweet;

}

const renderTweets = function (tweets){
  
  for(const obj of tweets){
     let $tweet = createTweetElement(obj);
     $('#tweet-container').append($tweet);
  }

}
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


renderTweets(data);

