import io from '../utils/io';
import throttle from '../utils/throttle';
// scroll events: header, blog, etc.
const scrollEvents = () => {

	let $header = document.querySelector('.header');
	let $footer = document.querySelector('.footer');

	// // header
	// let $fixedHeader       = document.querySelector('.header--is-fixed');
	// let $hero              = document.querySelector('.hero') || '';
	// // offset either hero height or height of nav / 100px
	// let headerScrollOffset = $hero ? $hero.offsetHeight : 100;
	
	// // blog
	// let $metaBar           = document.querySelector('.blog-meta-bar');
	// let $blogProgress      = document.querySelector('.blog-progress-bar');
	// let $postHero          = document.querySelector('.post-hero');
	// let metaBarOffset      = $postHero ? $postHero.offsetTop : 150;
	
	// // scrollspy
	// let sections           = {};
	// let $element           = document.querySelector('.scrollSpyElement');
	// let $scrollElems       = document.querySelectorAll('[data-scroll-target]');
	// let scrollspyOffset    = $element ? ($element.offsetHeight + $fixedHeader.offsetHeight + 20) : '';
	// for ( let section of $scrollElems ) {
	// 	sections[section.dataset.scrollTarget] = section.offsetTop;
	// }
	// // 

	// // videos
	// let $videos = [...document.querySelectorAll('video')].filter(video => !video.closest('[data-die]') );
	// // console.log($videos);
	// // 

	let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let oldScroll = 0;
	let scrollDirectionFlag = false;

	// 
	const isInViewport = (e, {top:t, height:h} = e.getBoundingClientRect()) => t <= window.innerHeight && t + h >= 0;

	window.addEventListener('scroll', throttle((e) => {

		let winScroll = document.body.scrollTop || document.documentElement.scrollTop;

		// // io for vids
		// [...$videos].map((video) => {
		// 	io(video, (inView) => {
		// 		if ( inView ) {

		// 			const playPromise = video.play();
		// 			if (playPromise !== undefined) {
		// 				playPromise.then(() => {
		// 					// Automatic playback started!

		// 				}).catch((error) => {
		// 					// Automatic playback failed.
		// 					// Show a UI element to let the user manually start playback.

		// 				});
		// 			}

		// 			// video.play();
		// 			// console.log('play');
		// 		} else {
		// 			video.pause();
		// 			// console.log('pause');
		// 		}
		// 	});
		// });
		// // 

		
		// direction detection
		if ( oldScroll < winScroll ) {
			if ( !scrollDirectionFlag ) {
				// console.log('down');
				document.body.dataset.scrollDirection = 'down';
				scrollDirectionFlag = true;
			}
		} else {
			if ( scrollDirectionFlag ) {
				// console.log('up');
				document.body.dataset.scrollDirection = 'up';
				scrollDirectionFlag = false;
			}
		}
		oldScroll = winScroll;
		//


		// // header
		// if ( $fixedHeader )
		// if ( winScroll > headerScrollOffset ) {
		// 	$fixedHeader.classList.add('is-revealed');
		// } else {
		// 	$fixedHeader.classList.remove('is-revealed');
		// }
		// //
		
		
		// // blog scroll progress indicator
		// let scrolled  = (winScroll / height) * 100;

		// if ( $blogProgress ) {
		// 	$blogProgress.style.width = scrolled + '%';
		// 	if ( winScroll > metaBarOffset ) {
		// 		$metaBar.classList.add('is-active');
		// 	} else {
		// 		$metaBar.classList.remove('is-active');
		// 	}
		// }
		// // 


		// // scrollspy
		// if ( $element ) {
		// 	if ( winScroll > headerScrollOffset ) {
		// 		$element.classList.add('is-active');
		// 	} else {
		// 		$element.classList.remove('is-active');
		// 	}
		// 	// scrollspy
		// 	for ( let i in sections ) {
		// 		if ( (sections[i] - scrollspyOffset) <= winScroll ) {
		// 			// console.log(i, sections[i]);
		// 			[...document.querySelectorAll('.scrollSpyElement [data-scroll-to]')].map(x => x.classList.remove('is-active'));
		// 			$element.querySelector('.scrollSpyElement [data-scroll-to="' + i + '"]').classList.add('is-active');
		// 		}
		// 	}
		// }
	
	}, 200));

}

export default scrollEvents;