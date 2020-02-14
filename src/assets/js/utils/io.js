const io = (el, cb, ratio=0) => {

	// basic intersetion observer
	// pass element
	// cb returns 0 or 1 if in view
	// usage: 
	// this.io(elem, (inView) => {
	// 	if ( inView ) {
	// 		functionName1();
	// 	} else {
	// 		functionName2();
	// 	}
	// });

	let inView = 0;

	// Create new IntersectionObserver
	const io = new IntersectionObserver(entries => {

		// Available data when an intersection happens
		// console.log(entries);

		if ( entries[0].intersectionRatio > ratio ) {
			// Element enters the viewport
			inView = 1;
		} else {
			// Element leaves the viewport 
			inView = 0;
		}
		
		// the cb
		updateStatus(inView);

	});

	// Start observing
	io.observe(el);

	// the cb
	function updateStatus(inView) {
		// console.log(inView);
		return cb(inView);
	}

};

export default io;