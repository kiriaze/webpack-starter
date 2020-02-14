// usage
// Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called. As in "execute this function only if 100 milliseconds have passed without it being called."
// debounce events like resize, or form input, where it doesnt need to be ran continuously
// const myHandler = (event) => // do something with the event
// const dHandler = debounce(myHandler, 200);
// domNode.addEventListener("input", dHandler);
const debounce = (fn, interval) => {
	let timerId;
	return function (...args) {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, interval);
	}
};

export default debounce;