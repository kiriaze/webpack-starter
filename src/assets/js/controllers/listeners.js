// example of global listeners from a controller perspective as opposed to per module
// import all modules for access to their relative methods; e.g. _onWindowResize();
class Listeners {

	constructor() {
		this.addEventListeners();
		this.removeEventListerners();
	}
	
	// 
	addEventListeners() {
		
		// add all listeners globally
		window.addEventListener('resize', (e) => this.onWindowResize(e));
		
		// doc based listeners

		document.addEventListener('pageChange', (e) => {

		});

		document.addEventListener('pageReady', (e) => {
			
		});

	}

	removeEventListerners() {
		// remove all listeners globally
		window.removeEventListener('resize', (e) => this.onWindowResize(e));
	}

	onWindowResize(e) {
		// console.log('widow resizing...', e);
		// fire each mods window resize event
	}

}

export default Listeners;