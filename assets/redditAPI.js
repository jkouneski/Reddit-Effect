const container = document.querySelector(".container-subreddit");


//Function to fetch reddit API data
function renderPosts (){

   fetch(`https://www.reddit.com/r/bitcoin/top.json`)
   .then(function(response) {
      return response.json();
   })
   //
   .then(function(response) {
      
      let currPost, markup = ``;
      
      // Array with posts                  
      const postsArr = response.data.children;
      
     
      markup = `<h3>Top posts from r/bitcoin</h3>`;
      
      //Loops through postArr to markdown a HTML element for each reddit post obje                       
      for (let i = 0; i < postsArr.length; i++) {
         currPost = postsArr[i].data;  
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


