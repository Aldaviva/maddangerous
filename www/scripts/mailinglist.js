(function(){
	require(["mojo/signup-forms/Loader"], function(L) {

		$('footer .mailinglist').click(function(event){
			event && event.preventDefault();

			document.cookie = "MCEvilPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 GMT"

			L.start({"baseUrl":"mc.us11.list-manage.com","uuid":"cafd06be4c5ec2687790a3daf","lid":"586e94be1c"});
		});

	});
})();