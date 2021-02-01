/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/* Create a new tweet*/
$(document).ready(function () {
  const createTweetElement = function (tweetData) {
    let $tweet = `<article class="tweet">
  <header>
    <div>
      <img src="${tweetData.user.avatars}">
      <h4>${tweetData.user.name}</h4>
    </div>
    <span>${tweetData.user.handle}<span>
  </header>
              
  <div>${escape(tweetData.content.text)}</div>
  
  <footer>
    <span>${tweetData.days}</span>
    <div>
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>   
    </div>
  </footer>
</article>`;
    return $tweet;
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $(".tweets").empty();

    tweets.forEach(function (tweet) {
      let $tweetElement = createTweetElement(tweet);
      $(".tweets").prepend($tweetElement);
    });
  };

  // Load Tweets, result is the result from the ajax get call
  function loadTweets() {
    $.ajax("/tweets", { method: "get", dataType: "json" }).then(function (
      result
    ) {
      renderTweets(result);
    });
  }
  loadTweets();

  const $button = $("#submit-tweet");
  $button.on("click", function () {
    event.preventDefault();

    if ($("#tweet-text").val().length === 0) {
      let $str = "Please enter some text in the box below.";
      $("#error").slideDown("slow", function () {
        $("#error").css("display", "flex"), $("#error").text($str);
      });
      return;
    } else if ($("#tweet-text").val().length > 140) {
      let $str = "Tweet is too long it must be less than 140 characters";
      $("#error").slideDown("slow", function () {
        $("#error").text($str), $("#error").css("display", "flex");
      });
      return;
    } else {
      console.log("Button clicked, performing ajax call...");
      $("#error").slideUp("slow", function () {
        $("#error").text(), $("#error").css("display", "none");
      });

      $.ajax("/tweets", { method: "post", data: $("#form").serialize() }).then(
        function () {
          loadTweets();
        }
      );
    }
  });
});
