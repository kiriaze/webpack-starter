'use strict';

var src  	= './src/',
	dist 	= './dist/',
	assets  = 'assets',
	stage   = 'CHANGE-ME',
	prod    = 'CHANGE-ME';

var cdn;
// var cdn  = '//cdn.com';

const baseConfig = {

	root: '/',

	src,

	dist,

	assets,

	data: `${src}${assets}/data/**/*.json`,
	html: `${src}/**/*.html`,

	// // Google pagespeed
	// URL         : 'http://domain.com',
	// strategy    : 'mobile',

	// 'localhost' || '0.0.0.0'
	localhost: 'localhost',

	proxy: false,

	port: {
		server: 8000,
		webpack: 3000
	},

	// deployment
	// set options here
	deploy: {
		staging: {
			source      : './dist/',
			hostname    : '127.0.0.1',
			username    : 'username',
			password    : '',
			destination : '/srv/users/username/apps/'+ stage +'/public',
			exclude     : []
		},
		production: {
			source      : './dist/',
			hostname    : '127.0.0.1',
			username    : 'username',
			password    : '',
			destination : '/srv/users/username/apps/'+ prod +'/public',
			exclude     : []
		}
	}

}

module.exports = baseConfig;