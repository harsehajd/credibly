// function to analyze the tweet using AI model or service
function analyzeTweet(tweetText) {

    const apikey = "[put the api key here LOL]";
    const apiurl = "put url here !";
    
    const requestBody = {
      text: tweetText
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`
      },
      body: JSON.stringify(requestBody)
    };
  
    return fetch(apiurl, requestOptions)
      .then(response => response.json())
      .then(data => {
        // extracting the credibility score from the response
        const credibilityScore = data.score;
        return credibilityScore;
      })
      .catch(error => {
        console.error("Error analyzing tweet:", error);
        return null; // returning null or a default value in case of error
      });
  }
  
  // listener for message from content script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "analyze_tweet") {
      const tweetText = request.tweetText;
      
      // performing AI analysis and grading
      analyzeTweet(tweetText)
        .then(credibilityScore => {
          // sending the credibility score back to the content script
          sendResponse({ score: credibilityScore });
        });
        
      // ensuring the response is sent asynchronously
      return true;
    }
  });
  