(function(){

	$.getJSON("/config/photos.json", function(photoCatalog){
		var photoToRender = randomSample(photoCatalog);
		var photoEl = $('.photo');

		$('img', photoEl).attr("src", "images/photos/"+encodeURIComponent(photoToRender.filename));
		if(photoToRender.photographer_name){
			var captionLinkEl = $('figcaption a', photoEl);
			captionLinkEl.text(photoToRender.photographer_name);
			if(photoToRender.photographer_url){
				captionLinkEl.attr("href", photoToRender.photographer_url);
			} else {
				captionLinkEl.removeAttr("href");
			}
			$('figcaption', photoEl).show();
		} else {
			$('figcaption', photoEl).hide();
		}
	});

	function randomSample(population){
		var length = population.length;
		var index = Math.floor(Math.random() * length);
		return population[index];
	}

})();