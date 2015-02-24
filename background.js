chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  var url = details.url;
  var bare_url = url.replace("https://", "").replace("http://", "");
  var match_string = "www.reddit.com/r/";
  if (bare_url.substring(0, match_string.length) === match_string) {
    console.log(url);
    console.log(bare_url);
  	var subreddit = bare_url.split('/')[2];
  	$.getJSON("http://www.reddit.com/r/" + subreddit + "/about.json", function(data) {
  		if (data['data']['over18']) {
  		    chrome.tabs.remove(details.tabId, function() { });
  		    chrome.history.deleteUrl({ "url": url}, function() { });
  		    chrome.windows.create({"url": url, "incognito": true});
  		}
  	});
  }
})
