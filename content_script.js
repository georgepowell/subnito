
var url = document.URL;
var subreddit = url.replace("https://", "").replace("http://", "").replace("www.reddit.com/r/", "").split('/')[0];

$.getJSON("http://www.reddit.com/r/" + subreddit + "/about.json", function(data) {

	console.log(data['data']['over18']);
});