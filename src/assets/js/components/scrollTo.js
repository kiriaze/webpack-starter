import EasingFunctions from '../utils/easing';

const requestAnimationFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame;

function scrollToTarget(to) {

	const start    = window.scrollY || window.pageYOffset;
	const time     = Date.now();
	const duration = Math.abs(start - to) / 0.9; // 0.7-3

	(function step() {
		var dx  = Math.min(1, (Date.now() - time) / duration);
		var pos = start + (to - start) * EasingFunctions.easeInOutCubic(dx); // easeInOutQuart / easeInOutCubic
		
		window.scrollTo(0, pos);

		if (dx < 1) {
			requestAnimationFrame(step);
		}
	})()
}

const scrollTo = () => {
	let $anchors = document.querySelectorAll('[data-scroll-to]');
	for ( let $anchor of $anchors ) {
		$anchor.addEventListener('click', (e) => {
			let target   = e.currentTarget.dataset.scrollTo;
			let $header  = document.querySelector('.header');
			let offset   = 0; // $header.offsetHeight;

			const to = document.querySelector(`[data-scroll-target="${target}"]`).offsetTop - offset;
			scrollToTarget(to);

		})
	}
}

export default scrollTo;