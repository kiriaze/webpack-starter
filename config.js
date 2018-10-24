'use strict';

var src  	= './src/',
	dist 	= './dist/',
	assets  = 'assets/',
	stage   = 'CHANGE-ME',
	prod    = 'CHANGE-ME';

var cdn;
// var cdn  = '//cdn.com';

const baseConfig = {

	root: '/',

	src,

	dist,

	assets,

	assetPath   : process.env.NODE_ENV == 'production' && cdn ? cdn : '/assets', // twig-prod.js

	data: `${src}${assets}data/**/*.json`,
	html: `${src}/**/*.html`,

	// // Google pagespeed
	// URL         : 'http://domain.com',
	// strategy    : 'mobile',

	// 'localhost' || '0.0.0.0'
	localhost: 'localhost',

	proxy: true,

	port: {
		server: 8000,
		webpack: 3000
	},

	// deployment
	// set options here
	deploy: {
		staging: {
			source      : './dist/',
			hostname    : '165.227.15.124',
			username    : 'basicagency',
			password    : '',
			destination : '/srv/users/basicagency/apps/'+ stage +'/public',
			exclude     : []
		},
		production: {
			source      : './dist/',
			hostname    : '165.227.15.124',
			username    : 'basicagency',
			password    : '',
			destination : '/srv/users/basicagency/apps/'+ prod +'/public',
			exclude     : []
		}
	}

}

module.exports = baseConfig;