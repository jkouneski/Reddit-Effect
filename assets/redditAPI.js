//linking to subreddit container on HTML
var container = document.querySelector(".container-subreddit");

var renderPosts = (coinType) => {
   //  Proxy that makes cross origin fetching possible
   var proxy = "https://cors-anywhere.herokuapp.com/";
   
   //Fetching reddit API using  URL on the selected crypto 

   fetch(`${proxy}https://www.reddit.com/r/${coinType}/top.json`)
   .then(function(response) {
      // Return the response in JSON format
      return response.json();
   })
   .then(function(response) {
      // We render our posts to the UI in this block
      var currPost, markup = ``;
      
      // The array that contains our posts
      var postsArr = response.data.children;
      
      // Adding a header based on post type
      markup = `<h3> Top posts from r/${coinType}</h3>`;
      
      // Iterate through our posts array and chain
      // the markup based on our HTML structure
      for (var i = 0; i < postsArr.length; i++) {
         currPost = postsArr[i].data;   // a single post object
         markup += `
            <a class="post" href="https://www.reddit.com/${currPost.permalink}">
               <div class="title"> ${currPost.title} </div>
               <div class="content"> 
                   ${currPost.selftext} 
                   </br></br>
                   <span>${currPost.url}</span>
               </div>
               <div class="author"> Posted by ${currPost.author} </div>
            </a>
         `;
      }
      // Insert the markup HTML to our container
      container.insertAdjacentHTML('afterbegin',markup);
   })
  
}; 