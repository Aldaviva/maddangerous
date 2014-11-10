(function(){

	var CALENDAR_ID = ""; //TODO get calendar id from will

	var calendarEl = $('.calendar');

	$.getJSON("https://aldaviva.com/portfolio/data/social/calendar", function(nextEvent){
		$('.title', calendarEl).text(nextEvent.title);
		var eventDate = new Date(nextEvent.startTime);
		$('.date_location', calendarEl).text(nextEvent.location + ', '
			+ (eventDate.getMonth()+1)+'/'+eventDate.getDate() + ' @ '
			+ eventDate.getHours()%12 + (eventDate.getMinutes() === 0 ? '' : ':'+eventDate.getMinutes()) + (eventDate.getHours<12 ? 'AM' : 'PM'));
		$('.addevent', calendarEl).attr('href', nextEvent.addEventUrl);
	});

})();