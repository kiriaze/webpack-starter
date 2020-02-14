const scrollTo = () => {
	let $anchors = document.querySelectorAll('[data-scroll-to]');
	for ( let $anchor of $anchors ) {
		$anchor.addEventListener('click', (e) => {
			let target   = e.currentTarget.dataset.scrollTo;
			let $header  = document.querySelector('.header');
			let $results = document.querySelector('.results-bar');
			let offset   = $results ? $header.offsetHeight + $results.offsetHeight : $header.offsetHeight;
			window.scrollTo({
				top: document.querySelector(`[data-scroll-target="${target}"]`).offsetTop - offset,
				left: 0,
				behavior: 'smooth'
			});
		})
	}
}

export default scrollTo;