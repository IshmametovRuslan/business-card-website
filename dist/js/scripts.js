$(document).ready(function () {
	$('#menu').click(function () {
		let x = $("#myTopnav");
		if (x.hasClass('topnav') ) {
			x.toggleClass('responsive')
		}else{
			x.className = 'topnav';
		}
	})
});