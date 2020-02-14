import scrollTo from './scrollTo';
import skrolly from './skrolly.js';
import lazyload from './lazyload.js';
import scrollEvents from './scrollEvents';

const ui = () => {
	scrollTo();
	lazyload();
	scrollEvents();
	skrolly({
		// selector: '[data-src]'
	});
};

export default ui;