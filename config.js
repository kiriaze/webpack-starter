'use strict';

var src  	= './src/',
	dist 	= './dist/',
	assets  = 'assets',
	stage   = 'stage',
	prod    = 'prod';

var cdn;
// var cdn  = '//cdn.com';

const baseConfig = {

	root: '/',

	src,

	dist,

	assets,

	entry: [
		'app',
		'styleguide'
	],

	data: `${src}${assets}/data/**/*.json`,
	html: `${src}/**/*.html`,

	// 'localhost' || '0.0.0.0'
	// swap commented out proxy/localhost if needing to access on other devices via ip address
	proxy: false,
	localhost: '127.0.0.1', // for safari sake..
	// localhost: 'localhost',
	// proxy: true,
	// localhost: '0.0.0.0',

	port: {
		server: 8000,
		webpack: 3000
	},

	// match with package.json dependencies
	// $ npm install package --save
	dependencies: {
		// '_': 'underscore',
		'$': 'jquery',
		// 'THREE': 'three',
		// 'jQuery': 'jquery',
		// 'window.jQuery': 'jquery'
	},

	// // deployment
	// // set options here
	// deploy: {
	// 	staging: {
	// 		source      : './dist/',
	// 		hostname    : '127.0.0.1',
	// 		username    : 'username',
	// 		password    : '',
	// 		destination : '/srv/users/username/apps/'+ stage +'/public',
	// 		exclude     : []
	// 	},
	// 	production: {
	// 		source      : './dist/',
	// 		hostname    : '127.0.0.1',
	// 		username    : 'username',
	// 		password    : '',
	// 		destination : '/srv/users/username/apps/'+ prod +'/public',
	// 		exclude     : []
	// 	}
	// }

}

module.exports = baseConfig;