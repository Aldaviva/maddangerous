(function(){

	var CALENDAR_ID = "avmde75fseoi8qsem9rde92hu0@group.calendar.google.com"; //TODO get calendar id from will

	var calendarEl = $('.calendar');

	calendarEl.hide();

	$.getJSON("https://aldaviva.com/portfolio/data/social/googlecalendar/"+CALENDAR_ID)
		.done(function(nextEvent){
			$('.title', calendarEl).text(nextEvent.title);
			var eventDate = new Date(nextEvent.startTime);
			$('.date_location', calendarEl).text(nextEvent.location || 'location tbd' + ', '
				+ (eventDate.getMonth()+1)+'/'+eventDate.getDate() + ' @ '
				+ eventDate.getHours()%12 + (eventDate.getMinutes() === 0 ? '' : ':'+eventDate.getMinutes()) + (eventDate.getHours<12 ? 'AM' : 'PM'));
			$('.addevent', calendarEl).attr('href', nextEvent.addEventUrl);
			calendarEl.show();
		})
		.fail(function(err){
			calendarEl.hide();
		});

})();