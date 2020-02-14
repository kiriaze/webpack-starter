/////////////////////////////////////////
// version 1:
/////////////////////////////////////////

// import gsap from 'gsap';

// export default class smoothScroll {

// 	// usage:
// 	// body {
// 	// 	overflow-x: hidden;
// 	// 	overflow-y: scroll;
// 	// }
// 	// [data-scroll-container] {
// 	// 	overflow: hidden;
// 	// 	position: fixed;
// 	// 	width: 100%;
// 	// 	top: 0;
// 	// 	left: 0;
// 	// 	will-change: transform;
// 	// 	backface-visibility: hidden;
// 	// 	perspective: 1000;
// 	// 	transform-style: preserve-3d;
// 	// 	background-color: #323a44;
// 	// }
	
// 	constructor($el) {
		
// 		this.el = $el ? document.querySelector($el) : document.querySelector('[data-scroll-container]');

// 		this.html = document.documentElement;
// 		this.body = document.body;

// 		this.scroller = {
// 			target: this.el,
// 			ease: 0.1, // <= scroll speed
// 			endY: 0,
// 			y: 0,
// 			resizeRequest: 1,
// 			scrollRequest: 0,
// 		};

// 		this.requestId = null;
		
// 		this.init();

// 	}

// 	init() {

// 		// // old
// 		// TweenLite.set(this.scroller.target, {
// 		// 	rotation: 0.01,
// 		// 	force3D: true
// 		// });
// 		// // 

// 		// new gsap
// 		gsap.set(this.scroller.target, {
// 			rotation: 0.01,
// 			force3D: true
// 		});
// 		this.ySet = gsap.quickSetter(this.scroller.target, 'y', 'px');
// 		// 

// 		this.updateScroller();

// 		window.focus();
// 		window.addEventListener('resize', () => this.onResize());
// 		document.addEventListener('scroll', () => this.onScroll());
// 		// document.addEventListener('wheel', (e) => {   
// 		// 	this.onScroll();
// 		// }, {
// 		// 	capture: true,
// 		// 	passive: true
// 		// });

// 	}

// 	updateScroller() {
		
// 		let resized = this.scroller.resizeRequest > 0;
			
// 		if (resized) {
// 			let height = this.scroller.target.clientHeight;
// 			this.body.style.height = height + 'px';
// 			this.scroller.resizeRequest = 0;
// 		}
				
// 		let scrollY = window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;

// 		this.scroller.endY = scrollY;
// 		this.scroller.y += (scrollY - this.scroller.y) * this.scroller.ease;

// 		if ( Math.abs(scrollY - this.scroller.y) < 0.05 || resized ) {
// 			this.scroller.y = scrollY;
// 			this.scroller.scrollRequest = 0;
// 		}
		
// 		// // old
// 		// TweenLite.set(this.scroller.target, { 
// 		// 	y: -this.scroller.y 
// 		// });
// 		// // 
		
// 		// new gsap
// 		gsap.ticker.add(() => {
// 			this.ySet(-this.scroller.y);
// 		});
// 		// 
		
// 		this.requestId = this.scroller.scrollRequest > 0 ? requestAnimationFrame(() => this.updateScroller()) : null;

// 	}

// 	onScroll() {
// 		this.scroller ? this.scroller.scrollRequest++ : '';
// 		if (!this.requestId) {
// 			this.requestId = requestAnimationFrame(() => this.updateScroller());
// 		}
// 	}

// 	onResize() {
// 		this.scroller.resizeRequest++;
// 		if (!this.requestId) {
// 			this.requestId = requestAnimationFrame(() => this.updateScroller());
// 		}
// 	}

// }


// ///////////////////////////////////////
// // version 2:
// //  // works best with mix-blend-mode: difference
// //  // scroll doesnt get jenky
// ///////////////////////////////////////

// export default class smoothScroll {
	
// 	constructor($el) {
		
// 		this.el   = $el ? document.querySelector($el) : document.querySelector('[data-scroll-container]');
// 		this.html = document.documentElement;
// 		this.body = document.body;
		
// 		this.init();

// 		// document.addEventListener('wheel', (e) => {   
// 		// 	this.onScroll();
// 		// }, {
// 		// 	capture: true,
// 		// 	passive: true
// 		// });
// 		window.addEventListener('scroll', (e) => this.onScroll());
// 		window.addEventListener('resize', (e) => this.onResize());

// 	}

// 	init() {
// 		document.body.style.height = `${this.el.clientHeight}px`;
// 	}

// 	onScroll() {
// 		TweenLite.to(this.el, 1.5, {
// 			y: -window.pageYOffset,
// 			ease: Expo.easeOut
// 		});
// 	}

// 	onResize() {
// 		document.body.style.height = `${this.el.clientHeight}px`;
// 	}	

// }


/////////////////////////////////////////
// version 3:
//  // works best with mix-blend-mode: difference
//  // scroll doesnt get jenky
/////////////////////////////////////////

export default class smoothScroll {
	
	constructor($el) {
		
		this.el  = $el ? document.querySelector($el) : document.querySelector('[data-scroll-container]');
		if ( !this.el ) return;

		// store the scroll position
		this.sx = 0;
		this.sy = 0;

		// store the container position.
		this.dx = this.sx;
		this.dy = this.sy;

		// The trick is to set a height to the body to keep the browser scroll bar.
		this.height = this.el.clientHeight;
		document.body.style.height = this.height + 'px';

		// Then we fix our container so it won't move when the user scrolls.
		// We will move it ourself with the Linear Interpolation and translations.
		this.el.style.position = 'fixed';
		this.el.style.top      = 0;
		this.el.style.left     = 0;

		// only enable if larger than tablet
		if ( window.innerWidth < 768 ) {
			this.el.style.position = '';
		} else {
			this.init();
		}

		window.addEventListener('scroll', (e) => this.onScroll());
		window.addEventListener('resize', (e) => this.onResize(e));

	}

	init() {
		window.requestAnimationFrame(() => this.render());
	}

	destroy() {
		document.body.style.height = '';
		window.cancelAnimationFrame(() => this.render());
		window.removeEventListener('scroll', (e) => this.onScroll());
		window.removeEventListener('resize', (e) => this.onResize(e));
	}

	render() {

		// We calculate our container position by using our Linear Interpolation method.

		this.dx = this.lerp(this.dx, this.sx, 0.13); // .07
		this.dy = this.lerp(this.dy, this.sy, 0.13); // .07

		this.dx = Math.floor(this.dx * 100) / 100;
		this.dy = Math.floor(this.dy * 100) / 100;

		// Finally we translate our container to its new positions.
		// Don't forget to add a minus sign because the container needs to move in 
		// the opposite direction of the window scroll.
		this.el.style.transform = `translate3d(-${this.dx}px, -${this.dy}px, 0)`;

		// And we loop again.
		window.requestAnimationFrame(() => this.render());

	}

	lerp(a, b, n) {
		// Linear Interpolation method.
		return (1 - n) * a + n * b;
	}

	onScroll() {
		// We only update the scroll position variables
		this.sx = window.pageXOffset;
		this.sy = window.pageYOffset;
	}

	onResize(e) {

		this.height = this.el.clientHeight;
		document.body.style.height = this.height + 'px';

		// disable tablet and under
		let win = e ? e.target : window;
		if ( win.innerWidth < 768 ) {
			this.el.style.position = '';
			this.el.style.transform = '';
		} else {
			this.el.style.position = 'fixed';
		}
	}

}
