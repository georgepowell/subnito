chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //chrome.tabs.remove(sender.tab.id, function() { });

    //chrome.history.deleteUrl({ "url": sender.tab.url}, function() { });

    //chrome.windows.create({"url": sender.tab.url, "incognito": true});
  });

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  var url = details.url;
  var bare_url = url.replace("https://", "").replace("http://", "");
  var match_string = "www.reddit.com/r/";
  if (match_string.substring(0, match_string.length) === match_string) {
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