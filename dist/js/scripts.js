$(document).ready(function () {
	$('#menu').click(function () {
		let x = $("#myTopnav");
		if (x.hasClass('topnav') ) {
			x.addClass('responsive')
		}else{
			x.className = 'topnav';
		}
	})
})