//linking to subreddit container on HTML
var container = document.querySelector(".container-subreddit");
var redditApi = "https://www.reddit.com/r/bitcoin/top.json";

fetch(redditApi)
   .then(function(response) {
      return response.json();
   })