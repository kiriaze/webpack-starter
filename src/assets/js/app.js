// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

////////////////////////////////////////////
// SCSS
////////////////////////////////////////////

// Plugins
// import 'magnific.popup/dist/assets/magnific.popup.css';

// Core Styles
import '../scss/style.scss';

////////////////////////////////////////////
// JS
////////////////////////////////////////////

// Require the io polyfill before 
// requiring any other modules.
require('intersection-observer');

// import 'jquery';

// Plugins
// import 'magnific-popup';

// // 
// import gsap from 'gsap';

// // Utilities
// // import io from './io.js'; //
// import skrolly from './skrolly.js';
// import lazyload from './lazyload.js';
// import debounce from './debounce.js';
// import throttle from './throttle.js';
// // import utility from './utility.js';

// 
// import ui from './ui.js';

// import smoothScrolling from './smoothScrolling.js';

// Views
// e.g. about

// Modules
// e.g. modals, carousel, menus, etc.
// note: either load mod styles via their respective script.js, or within the main stylesheet
// import heroes from '../../views/modules/heroes/hero/script.js';

// app singleton
class App {

	constructor() {

		this.$window     = window;
		this.$document   = document;
		this.$html       = document.documentElement;
		this.$body       = document.body;

		this.urlParams = new URLSearchParams(window.location.search);
		
		this.addEventListeners();

	}

	init() {
		// console.log('init...');
		// debounce();
		// throttle();

		// // these need to be rerun/reindexed
		// skrolly({
		// 	// selector: '[data-src]'
		// });
		// // 
	}

	modules() {
		// carousels();
		// lazyload();
	}

	addEventListeners() {

		// non critical scripts
		window.addEventListener('load', () => {
			// this.scroll = new smoothScrolling('[data-scroll-container]');
			this.modules();
		});

		// critical scripts
		document.addEventListener('DOMContentLoaded', () => {
			this.init();
			this.mutationWatch();
			// // handles .has-loaded/init-load classes
			// preloader();
		});

	}

	mutationWatch() {

		// console.log('mutationWatch init');
		
		// DOM element we want to observe
		let targetNode = document.querySelector('[data-ajax-wrap]');

		if ( !targetNode ) return;

		// Options for the observer
		let config = {
			childList: true,
			// attributes: true,
			// attributeOldValue: true,
			// attributeFilter: ['class'],
		};

		// Callback will execute when mutations are observed
		let callback = (mutationsList) => {

			// console.log('mutationWatch cb');

			// // rerun scripts..
			// // is there a better more optimized solution, feels like this is causing major leakage..
			this.modules();

			// // these need to be rerun/reindexed
			// skrolly({
			// 	// selector: '[data-src]'
			// });
			// // 

			// // 
			// setTimeout(() => {
			// 	// destroy/re-instantiate for testing custom scroll for home only
			// 	this.scroll.destroy();
			// 	this.scroll = new smoothScrolling('[data-scroll-container]');
			// }, 0);

			// // possibly match each mutations data-attr to match js callbacks
			// // e.g. data-module-instantiated, then check if mod has attr
			// for (let mutation of mutationsList) {
			// 	console.log('something', mutation);
			// 	// new PDPHero(this, {});
			// }
		};

		// Create a new observer, passing in the callback function
		let observer = new MutationObserver(callback);
		
		// Start observing the targetNode with the given configuration
		observer.observe(targetNode, config);
	}

}

new App();