import '../../scss/ui/preloader.scss';
const preloader = () => {

	// for loading sequences
	document.documentElement.classList.add('init-load'); 
	// 

	let $loadbar    = document.querySelector('.loadbar');
	let $pageLoader = document.querySelector('.page-loader');

	if ( !$pageLoader ) return;

	// 
	let defaultTime = 500; // defaults to .5s
	let width = 100,
		perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
		EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
		time = parseInt((EstimatedTime/1000)%60)*100;
		time = time < defaultTime ? defaultTime : time;

	$loadbar.style.animationDuration = (time / 1000) + 's';

	// console.log(time);

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
			
			// $loadbar.style.width = current + '%';

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
		if ( e.target.matches('.page-loader') && e.propertyName == 'opacity' ) {
			if ( !blackFlag ) {
				document.documentElement.classList.remove('init-load');
				blackFlag = true;
				// dispatch initial-load event?
			}
		}
	});

}

export default preloader;