// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

//=======================================
// SCSS imports
//=======================================

import '../scss/styleguide.scss';

//=======================================
// JS
//=======================================

import jQuery from 'jquery';
import 'jquery.easing';

function hexc(colorval) {
	var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	delete(parts[0]);
	for (var i = 1; i <= 3; ++i) {
		parts[i] = parseInt(parts[i]).toString(16);
		if (parts[i].length == 1) parts[i] = '0' + parts[i];
	}
	let color = '#' + parts.join('');
	return color;
}

// attach colors
setTimeout( () => {
	$('.styleguide__colors li').each( (index, elem) => {
		let color = $(elem).css('background-color');
		$(elem).append('<span>');
		$(elem).find('span').text(hexc(color));
	});
}, 1000);

// append anchors
let targets = [];
$('.styleguide__section').each( (index, elem) => {
	let target = $(elem).attr('data-scroll-target');
	targets.push(target);
	$('.sidebar ul').append('<li><a href="javascript:;">')
});

// attach links/titles to anchors
$('.sidebar a').each( (index, elem) => {
	$(elem).text(targets[index]).attr('data-scroll-to', targets[index]);
});

// scrollTo
$('.sidebar a').on('click', (e) => {
	let elem = $(e.currentTarget).attr('data-scroll-to');
	$('html, body').animate({
		scrollTop: $('[data-scroll-target="' + elem + '"]').offset().top
	}, 1200, 'easeOutExpo');
});