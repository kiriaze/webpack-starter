// usage
// Throttling enforces a maximum number of times a function can be called over time. As in "execute this function at most once every 100 milliseconds."
// throttle events like scroll, mousemove...
// const myHandler = (event) => {
// 	// do something with the event
// }
// const tHandler = throttle(myHandler, 200);
// domNode.addEventListener("mousemove", tHandler);
const throttle = (fn, delay) => {
	let lastCall = 0;
	return function (...args) {
		const now = (new Date).getTime();
		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return fn(...args);
	}
};

export default throttle;