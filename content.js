// function to send a message to the background script
function sendMessageToBackground(message, callback) {
    chrome.runtime.sendMessage(message, function (response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        callback(response);
      }
    });
  }
  
  // function to extract tweet text from the webpage!
  function getTweetText() {
    const tweetElement = document.querySelector(".tweet-text"); // adjusting the selector based on the Twitter's DOM structure
    return tweetElement ? tweetElement.innerText : null;
  }
  
  // function to analyze the tweet and display the credibility score
  function analyzeAndDisplayCredibility() {
    const tweetText = getTweetText();
    if (tweetText) {
      // sending message to background script for analysis
      sendMessageToBackground({ message: "analyze_tweet", tweetText }, function (
        response
      ) {
        const credibilityScore = response.score;
        // displaying the credibility score as desired (e.g., add it as an overlay to the tweet)
        console.log("Credibility Score:", credibilityScore);
      });
    }
  }
  
  // event listener for page load or AJAX updates (depending on Twitter's dynamic behavior)
  document.addEventListener("DOMContentLoaded", analyzeAndDisplayCredibility);
  