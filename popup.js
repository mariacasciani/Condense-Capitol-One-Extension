
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  //gets first since there should only be one active tab
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];

    //gets us the url of the current tab --> so ie is the url of the news article 
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);

    //takes user to archived summaries
    $(".past").click(function() {
      window.location.href = "past.html";
    });
  });
}


 //summarizes article and adds summary to the extension's html
function getSummary(url) {
  $("#summarize").click(function(length) {
    var length = document.getElementById("sentlength").value;
    //calls API method to summarize article
    blockspring.runParsed("summarize-url-with-aylien", 
    { "url": url, "max_sentences": length}, 
    { "api_key": "br_27352_49e6888ad9d3aa0c5f741cf03bcbd47590e21752"}, 
    function(res){
      document.getElementById("summary").innerHTML = res.params.summary;
      //stores summary in local storage
      try {
        localStorage.setItem(url, res.params.summary);
      }
      //clears local storage if its full and then adds new summary
      catch(e) {
        localStorage.clear();
        localStorage.setItem(url, res.params.summary);
      }
      });
  });
   
}


//callback calls getSummary to summarize
getCurrentTabUrl(getSummary); 

 