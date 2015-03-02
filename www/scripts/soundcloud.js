(function(){

	var CLIENT_ID = "543c75bc4ce430e7b890b20ed0a5712b";

	var currentTrackId = "127312382";
	var currentTrack = null;
	var soundcloudEl = $('.soundcloud');
	var isPlaying = false;
	var currentSound = null;

	initialize();

	function initialize(){
		SC.initialize({
			client_id: CLIENT_ID
		});

		$.getJSON("http://api.soundcloud.com/tracks/"+currentTrackId+".json?client_id="+CLIENT_ID, function(track){
			currentTrack = track;
			render();
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
			src: currentTrack.artwork_url //use default large (100x100) size
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