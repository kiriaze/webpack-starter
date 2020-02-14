// note: possibly consolidate other utils into this?
const utility = {
	// to be called in app.js
	init: () => {
		utility.isMobileDevice();
	},
	// can be called individually if needed within each module
	isMobileDevice: () => {
		return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	},

};

export default utility;