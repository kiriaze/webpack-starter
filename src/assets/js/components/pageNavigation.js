// ajax page content injection, loading animation/transitions, and history state.
import gsap from 'gsap';
class pageNavigation {
	
	constructor() {

		this.$ajaxWrap   = document.querySelector('[data-ajax-wrap]');
		this.$loader     = document.querySelector('.page-loader');
		this.$canvas     = document.querySelector('.canvas-wrapper');

		this.requestID = null;

		// testing timelines instead of raf
		this.tl = gsap.timeline();

		this.init();
		this.addEventListeners();

	}

	init() {

	}

	// fetch page with optional pushState update
	fetchPage(url, update=false) {
		
		// 
		this.onStart();
		this.animateIn();

		// wrap in animation or should we abstract
		this.tl.to([this.$ajaxWrap], .35, {
			opacity: 0,
			ease: 'power2.out', // expo.out / power2.out
			onComplete: () => {

				fetch(url)
					.then( response => response.text() )
					.then( body => {

						let content = this.parseData(body, url);
						this.injectContent(content);

						// 
						this.onComplete();
						this.animateOut();
						
						if ( update ) {
							// history state / update state
							history.pushState(url, null, url);
						}

					});
			}
		});


		// // testing non class/animation version with dispatched events
		// fetch(url)
		// 	.then( response => response.text() )
		// 	.then( body => {

		// 		let content = this.parseData(body, url);
		// 		this.injectContent(content);

		// 		this.onComplete();
		// 		this.animateOut();
				
		// 		if ( update ) {
		// 			// history state / update state
		// 			history.pushState(url, null, url);
		// 		}

		// 	});

	}

	// abstracted method
	onStart() {
		// console.log('how many times?');

		// todo:
			// abstract class assignment and animations to the dispatched event listener, most likely in a controller?

		// create event; overrides reference
		this.pageChange = new CustomEvent('pageChange', {
			'detail': {
				'desc': 'Page is changing.',
				'url': this.url
			}
		});
		// dispatch event
		document.dispatchEvent(this.pageChange);


		// 
		document.documentElement.classList.add('is-loading');
		document.documentElement.classList.remove('has-loaded');

	}

	onComplete() {

		// todo:
			// abstract class assignment and animations to the dispatched event listener, most likely in a controller?

		// create event; overrides reference
		this.pageReady = new CustomEvent('pageReady', {
			'detail': {
				'desc': 'Page is finished loading.',
				'url': this.url
			}
		});
		// dispatch page finished loading event
		document.dispatchEvent(this.pageReady);

		// 
		document.documentElement.classList.remove('is-loading');

		// cancelAnimationFrame(this.requestID);
		// this.requestID = null;

	}

	animateIn() {

		// this.requestID = requestAnimationFrame(() => animateIn());

		// gsap example

		if (this.tl.isActive()) {
			return;
		}

		// console.log('animating in');


		// testing idea of is-entering/is-leaving classes/attr
		document.body.dataset.transition = 'is-entering-start';
		// 


		// Clear the timeline
		this.tl.clear();

		// // hack to fully transition opacity before loader
		// this.tl.to([this.$ajaxWrap], .35, {
		// 	opacity: 0,
		// 	ease: 'power2.out' // expo.out / power2.out
		// });
		// // 

		// // 
		// this.tl.to(this.$loader, 0.45, {
		// 	y: '0%',
		// 	delay: 0.35,
		// 	// backgroundColor: 'red',
		// 	onComplete: () => {

		// 		// testing idea of is-entering/is-leaving classes/attr
		// 		document.body.dataset.transition = 'is-entering-end';
		// 		// 

		// 	}
		// });
		
	}

	animateOut() {
		
		// this.requestID = requestAnimationFrame(() => animateOut());

		// gsap example

		if (this.tl.isActive()) {
			return;
		}

		// console.log('animating out');

		// testing idea of is-entering/is-leaving classes/attr
		document.body.dataset.transition = 'is-leaving-start';
		// 

		window.scrollTo(0, 0);

		// wrapped in timeout since this y transform runs too quickly
		setTimeout( () => {
			
			// document.body.style.backgroundColor = '';

			// this.tl.to(this.$loader, 0.45, {
			// 	y: '-100%',
			// 	// backgroundColor: 'purple',
			// 	// backgroundColor: 'white',
			// 	onComplete: () => {

					this.tl.to([this.$ajaxWrap], .35, {
						opacity: 1,
						ease: 'power2.out' // expo.out / power2.out
					});
					
					// this.tl.set(this.$loader, {
					// 	y: '100%',
					// 	// backgroundColor: 'white',
					// });

					document.documentElement.classList.add('has-loaded');

					// testing idea of is-entering/is-leaving classes/attr
					document.body.dataset.transition = 'is-leaving-end';
					// 

			// 	}
			// });

		}, 500); // 750

	}

	injectContent(content) {
		this.$ajaxWrap.innerHTML = content.querySelector('[data-ajax-wrap]').innerHTML;
		document.title           = content.querySelector('title').innerText;

		// // set doc height // being set by smoothScroll for now
		// let height = this.$ajaxWrap.clientHeight;
		// document.body.style.height = height + 'px';
	}

	parseData(data, url) {
		// grab content
		const parser       = new DOMParser();
		const htmlDocument = parser.parseFromString(data, 'text/html');
		const content      = htmlDocument.documentElement;
		return content;
	}

	addEventListeners() {

		// ajax page navigation / content
		window.addEventListener('popstate', (e) => {
			// e.state is equal to the last url of item we clicked
			// console.log(e.target.location.href, e.state);
			// since it doesn't work page loads, navigates, then goes back,
			// we'll use e.target.location.href
			// if ( e.state !== null ) {
			if ( e.target.location.href !== null ) {
				this.url = e.target.location.href;
				this.fetchPage(e.target.location.href);
			}
		});

		document.addEventListener('click', (e) => {
			// console.log(e, e.target, e.currentTarget);
			// if has attr data-ajax-nofollow, typically an external link, or target="new", allow for default navigation
			if ( e.target.closest('[data-ajax-nofollow]') ) return;
			if ( 
				// rather than checking whether whats clicked is an actual anchor,
				// we check if whats clicked is a ancestor of an anchor tag and a data-ajax-links
				// and if so proceed
				e.target.closest('a') &&
				e.target.closest('[data-ajax-links]') 
			) {
				e.preventDefault();
				this.url = e.target.closest('a').href;
				// console.log(this.url);
				if ( 
					this.url !== '' && 
					this.url !== window.location.href &&
					this.url !== undefined &&
					this.url !== 'javascript:;'
				) {
					this.fetchPage(this.url, true);
				}
			}
		}, false);

	}

}
export default pageNavigation;