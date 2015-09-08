(function(){

	var CLIENT_ID = "543c75bc4ce430e7b890b20ed0a5712b";

	var currentTrack = null;
	var soundcloudEl = $('.soundcloud');
	var isPlaying = false;
	var currentSound = null;

	initialize();

	function initialize(){
		SC.initialize({
			client_id: CLIENT_ID
		});

		getCurrentTrackId(function(currentTrackId){
			$.getJSON("http://api.soundcloud.com/tracks/"+currentTrackId+".json?client_id="+CLIENT_ID, function(track){
				currentTrack = track;
				render();
			});
		});
	}

	function getCurrentTrackId(callback){
		$.getJSON("/config/soundcloud.json", function(soundcloudConfig){
			var trackUrl = soundcloudConfig.trackUrl || "https://soundcloud.com/maddangerous/state-of-the-danger-2013";
			var urlParser = document.createElement("a");
			urlParser.href = trackUrl;
			var urlPathComponents = urlParser.pathname.replace(/^\/+/, "").split(/\//);
			var artistPermalink = urlPathComponents[0];
			var trackPermalink = urlPathComponents[1];

			$.getJSON("http://api.soundcloud.com/users/?q="+artistPermalink+"&client_id="+CLIENT_ID, function(artistSearchResults){

				var artist = artistSearchResults.filter(function(item){
					return item.permalink === artistPermalink;
				})[0];

				$.getJSON("http://api.soundcloud.com/users/"+artist.id+"/tracks?client_id="+CLIENT_ID, function(tracks){
					var track = tracks.filter(function(item){
						return item.permalink === trackPermalink;
					})[0];

					var trackId = track.id;
					callback(trackId);
				});
			});
		});
	}

	function render(){
		$('.play', soundcloudEl).attr('title', 'Play '+currentTrack.title);
		$('.title', soundcloudEl)
			.text(currentTrack.title)
			.attr({
				title: currentTrack.title,
				href: currentTrack.permalink_url
			});
		$('.artwork', soundcloudEl).attr({
			title: currentTrack.title + ' on Soundcloud',
			href: currentTrack.permalink_url
		});
		$('.artwork img', soundcloudEl).attr({
			alt: currentTrack.title + ' album art',
			src: currentTrack.artwork_url || currentTrack.user.avatar_url //use default large (100x100) size
		});
	}

	$('.play', soundcloudEl).click(function(event){
		event.preventDefault();

		isPlaying ? pause() : play();
	});

	function play(){
		isPlaying = true;
		$('.play', soundcloudEl).addClass('playing');

		var loadSound = (currentSound === null) ? SC.stream.bind(SC) : function(_url, _opts, cb) { cb(currentSound); };
		var streamOpts = {
			onfinish: function(){
				currentSound = null;
				pause();
			}
		};
		loadSound("/tracks/"+currentTrackId, streamOpts, function(sound){
			currentSound = sound;

			sound.play();
		});
	}

	function pause(){
		isPlaying = false;
		$('.play', soundcloudEl).removeClass('playing');

		currentSound && currentSound.pause();
	}

})();