(function(){

	var USERNAME = "maddangerous";

	var twitterEl = $('.twitter');

	$.getJSON("https://aldaviva.com/portfolio/data/social/twitter/"+USERNAME, function(twitterStatus){
		$('.tweet_body', twitterEl).text(twitterStatus.body);
	});

})();