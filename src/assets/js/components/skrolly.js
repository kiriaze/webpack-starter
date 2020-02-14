const skrolly = ( params = {} ) => {

	// issues:
		// translate3d is messing with z index of elem/children
			// solution: remove data-skrolly from elems once animations are done; requestAnimationFrame

	// params = {
	// 	reverse: false,
	// 	el: '[data-skrolly]', 
	// 	revealClass: 'revealed', // css class animations
	// 	root: null, // defaults to document
	// 	threshold: 0, // 0-1; e.g. .5 would trigger when el is 50% in viewport based on what elem root is set to
	// 	rootMargin: '0% 0% 0% 0%' // trigger px/% from any direction
	// }

	let el          = params.el || '[data-skrolly]';
	let reverse     = params.reverse || false;
	let revealClass = params.revealClass || 'revealed';

	let root        = params.root || null;
	let threshold   = params.threshold || 0;
	let rootMargin  = params.rootMargin || '0% 0% 0% 0%';

	const config = {
		// root: root,
		threshold: threshold,
		rootMargin: rootMargin
	};

	const reveal = (el) => {
		el.classList.add(revealClass);
		// if ( !el.classList.contains(revealClass) ) {
		// 	requestAnimationFrame(reveal(el));
		// }
	};

	const dereveal = (el) => {
		el.classList.remove(revealClass);
	};

	const isRevealed = el => (
		el.classList.contains(revealClass)
	);

	const intersectionObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {

			if ( entry.intersectionRatio > 0 ) {

				// console.log(entry);

				// if ( !reverse ) {
				// 	// it's good to remove observer,
				// 	// if you don't need it any more (e.g. lazyloading)
				// 	observer.unobserve(entry.target);
				// }
				// // 

				// console.log(entry.target.classList + ' in view');

				// e.g. data-skrolly='fade-in' data-skrolly-delay='500ms'
				let delay = entry.target.dataset.skrollyDelay || '0';
				// when elements are in viewport, do fancy; e.g. doRad();
				let cb    = entry.target.dataset.skrollyCb || '';

				entry.target.style.transitionDelay = delay;
				reveal(entry.target);

				// requestAnimationFrame check to remove data-skrolly from elements, to fix issues with elem/children of elem having their z-index affected when translate3d is used (css animations off of data-skrolly.revealed)
				// requestAnimationFrame(reveal(entry.target));
				// using transitionend instead for now...i have no idea how to fix this...
				// should we not position elems with transforms...?fuck man..
				// entry.target.addEventListener('transitionend', () => {
				// 	let style = getComputedStyle(entry.target);
				// 	// console.log(style.transform);
				// 	// entry.target.style.transform = style.transform;
				// 	entry.target.style.transform = 'none';
				// });

				// run callback if passed
				if ( cb ) {
					cb = cb.replace(/\s+/g, '').split(',');
					for (var i = 0, len = cb.length; i < len; i++) {
						var fn = this[cb[i]];
						// pass data-attributes of elem if needed
						if (typeof fn === 'function') fn(entry.target, entry.target.dataset);
					}
				}

			} else {

				if ( reverse ) {
					// console.log(entry.target.classList + ' out of view');
					dereveal(entry.target);
				}

			}

		});

	});

	// merge data-skrolly elems with grouped children
	let elems    = [];
	let children = [];
	let elemsMap = [...document.querySelectorAll(el)].map((x) => {
		if ( x.hasAttribute('data-skrolly-group') ) {
			// skrolly-delay
			[...x.children].map((y, index) => {
				let delay = x.dataset.skrollyDelay ? x.dataset.skrollyDelay.split('ms')[0] : '';
				y.dataset.skrollyDelay = delay*(index+1)/2 + 'ms'
				children.push(y);
			});
		} else {
			elems.push(x);
		}
	});
	elems = [...children, ...elems];

	// console.log(elems); // its out of order, but does it matter?

	// get only these elements,
	// which are not revealed yet
	const elements = [].filter.call(
		elems,
		el => !isRevealed(el, revealClass)
	);

	// start observing your elements
	elements.forEach((el) => intersectionObserver.observe(el));

};

export default skrolly;