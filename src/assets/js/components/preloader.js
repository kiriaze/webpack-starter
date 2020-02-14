const preloader = () => {

	// for loading sequences
	document.documentElement.classList.add('init-load'); 
	// this.$html.classList.add('is-loading');
	// 
	
	let $loadbar    = document.querySelector('.loadbar');
	let $pageLoader = document.querySelector('.page-loader');
	let $intro      = document.querySelectorAll('[data-loading-intro]');
	let $meta       = document.querySelector('.page-loader__meta');

	// 
	let width = 100,
		perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
		EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
		time = parseInt((EstimatedTime/1000)%60)*100;
		time = time < 2500 ? 2500 : time; // defaults to 2.5s

	[...$intro].map($i => $i.style.animationDuration = (time / 1000) + 's');
	$loadbar.style.animationDuration = (time / 1000) + 's';
	if ( $meta ) $meta.style.animationDuration = (time / 1000) + 's';

	// Percentage Increment Animation
	let PercentageID = document.querySelector('#percent'),
		start        = 0,
		end          = 100,
		durataion    = time;

	animateValue(PercentageID, start, end, durataion);

	function animateValue(id, start, end, duration) {

		let range     = end - start,
			current   = start,
			increment = end > start ? 1 : -1,
			stepTime  = Math.abs(Math.floor(duration / range)),
			obj       = id;

		let timer = setInterval(() => {
			current             += increment;
			obj.innerText       = current + '%';
			if (current == end) {
				clearInterval(timer);
			}
		}, stepTime);
	}

	// Start loading sequence off html.has-loaded class
	setTimeout(() => {
		document.documentElement.classList.add('has-loaded');
		// emit custom finished loading event, rather than using window.load
		let preloaderComplete = new CustomEvent('preloaderComplete', {
			'detail': {
				'desc': 'Preloader has finished.'
			}
		});
		// dispatch event
		document.dispatchEvent(preloaderComplete);
	}, time);

	//
	let blackFlag = false;
	if ( $pageLoader )
	$pageLoader.addEventListener('transitionend', (e) => {
		// if ( e.target.matches('.page-loader') && e.propertyName == 'transform' ) {
		if ( e.target.matches('.page-loader') && e.propertyName == 'opacity' ) {
			if ( !blackFlag ) {
				document.documentElement.classList.remove('init-load');
				// $pageLoader.style.transform = 'translate3d(0, 100%, 0)';
				blackFlag = true;
				// dispatch initial-load event?
			}
		}
	});

}

export default preloader;