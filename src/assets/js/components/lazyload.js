const lazyload = (params = {}) => {

	// to preventing content reflow, height or padding required for img tags or parent selectors otherwise they collapse:

	// 2 ways of usage:
	// <div class="lazyload">
	// 	<img src="" data-src="" />
	// </div>
	// .lazyload {
	// 	width: 100%;
	// 	position: relative;
	// 	@include responsive-ratio(1200, 600, true);
	// 	img {
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		width: 100%;
	// 		height: 100%;
	// 	}
	// }
	// .lazyloaded {
	// 	opacity: 1;
	// }
	
	// typically pseudos do not work on img tags, however, there is an exception to that rule:
		// if an images src attribute is invalid, browsers will reneder its pseudo-elements.
		// as soon as the data-src becomes the src, the browser stops rendering ::before and the images natural aspect ratio takes over.
		// src is svg with aspect set on viewbox

	// <img src="data:image/svg+xml,%3Csvg xmlns=\http://www.w3.org/2000/svg\' viewBox=\'0 0 2 1\'%3E%3C/svg%3E" data-src="https://placehold.it/1200x600" />
	// [data-src] {
	// 	width: 100%;
	// 	display: block;
	// 	position: relative;
	// 	&:before {
	// 		content: '';
	// 		display: block;
	// 		@include responsive-ratio(1200, 600);
	// 	}
	// }
	// .lazyloaded {
	// 	opacity: 1;
	// }

	// bugs: the second method of usage with img:before still makes content jump...
	
	// params = {
	// 	selector: '.lazyload',
	// 	offset: '0px 0px 0px 0px' // pos val triggers %/px before elem in view, neg val triggers after elem is %/px in view
	// }

	// let nested   = params.nested || false;
	let selector = params.selector || '.lazyload';
	let offset   = params.offset || '0px 0px 0px 0px';
	const images = document.querySelectorAll(selector);
	
	const config = {
		rootMargin: offset,
		threshold: 0
	}; 
	
	const handleIntersection = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.intersectionRatio > 0) {
				if ( entry.target.dataset.src ) {
					// loadImage(entry.target);

					let elem = entry.target;
					let src  = elem.dataset.src;
					elem.tagName === 'IMG' ?
						elem.src = src :
						elem.style.backgroundImage = 'url('+ src +')';
					elem.classList.add('lazyloaded');

				} else {
					// loadImage(entry.target.querySelector('[data-src]'));

					let elem = entry.target.querySelector('[data-src]');
					let src  = elem ? elem.dataset.src : '';
					if ( elem ) {
						elem.tagName === 'IMG' ?
							elem.src = src :
							elem.style.backgroundImage = 'url('+ src +')';
						elem.classList.add('lazyloaded');
					}
					
				}
				observer.unobserve(entry.target);
			}
		})
	}
	
	const observer = new IntersectionObserver(handleIntersection, config);

	// const loadImage = (image) => {
	// 	const src = image.dataset.src;
	// 	fetchImage(src).then(() => {
	// 		image.tagName === 'IMG' ?
	// 			image.src = src :
	// 			image.style.backgroundImage = 'url('+ src +')'; // these makes 2 requests..
	// 		image.classList.add('lazyloaded');
	// 	})
	// }

	// const fetchImage = (url) => {
	// 	return new Promise((resolve, reject) => {
	// 		const image = new Image();
	// 		image.src = url; // these makes 2 requests..
	// 		image.onload = resolve;
	// 		image.onerror = reject;
	// 	});
	// }

	// images.forEach(image => {
	// 	observer.observe(image)
	// });

	// older browsers
	for (let i = 0; i < images.length; ++i) {
		observer.observe(images[i]);
	}

};

export default lazyload;