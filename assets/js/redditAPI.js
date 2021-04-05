var container = document.querySelector(".container-subreddit");
var redditUrl = "https://www.reddit.com/r/CryptoCurrencies/top.json";

//Function to fetch reddit API data
function renderPosts() {
  //Fetching API data
  fetch(redditUrl)
    .then(function(response) {
        return response.json();
  })
    //Passing result to array 
    .then(function(response) {

      // Array with posts                  
      var postsArr = response.data.children;
      var redditPost, markup = ``;

      //Single Subreddit Post markdown title
      markup = "<h2>Top posts from r/CryptoCurrencies subreddit</h2>";
      
      //Loops through postArr to markdown a HTML element for each reddit post obje                       
      for (var i = 0; i < postsArr.length; i++) {
          redditPost = postsArr[i].data;
          markup += `
            <div class = "cell">
              <div class = "card">
                <div class="card-title card-divider">${redditPost.title}</div>
                <a href = "${redditPost.url}">See Post</a>
                <div class="card-author"> Posted by ${redditPost.author} </div>
              </div>
            </div>
            `;
      }
      // Insert the markup HTML to our container
      container.insertAdjacentHTML('afterbegin', markup);
  })
};
renderPosts();  
   

  