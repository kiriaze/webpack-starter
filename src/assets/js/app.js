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

// Plugins
// import 'jquery';
// import 'magnific-popup';

// Utilities
import utility from './utils/utility.js';


// 
import ui from './components/ui.js';
import preloader from './components/preloader.js';
import pageNavigation from './components/pageNavigation.js';
import smoothScrolling from './components/smoothScrolling.js';

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
	}

	modules() {
		ui();
		// carousels();
	}

	addEventListeners() {

		// non critical scripts
		window.addEventListener('load', () => {
			this.scroll = new smoothScrolling('[data-scroll-container]');
			this.modules();
		});

		// critical scripts
		document.addEventListener('DOMContentLoaded', () => {
			this.init();
			this.mutationWatch();
			// handles .has-loaded/init-load classes
			preloader();
			new pageNavigation();
		});

	}

	// ajax navigation - trigger js updates
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
			// // research better solution, could cause major leakage..
			this.modules();

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