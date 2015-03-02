(function(){

	var USERNAME = "maddangerous";

	var twitterEl = $('.twitter');
	var metadataEl = $('.tweet_metadata', twitterEl);
	metadataEl.hide();

	$.getJSON("https://aldaviva.com/portfolio/data/social/twitter/"+USERNAME, function(twitterStatus){
		$('.tweet_body', twitterEl).text(twitterStatus.body);

		var tweetMoment = new moment(twitterStatus.created);
		$('.time', metadataEl).text(tweetMoment.format("MMM D, YYYY"));
		$('.date', metadataEl).text(tweetMoment.format("h:mm a"));
		metadataEl.show();

	});

})();