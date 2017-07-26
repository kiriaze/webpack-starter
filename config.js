'use strict';

var src  	= './src',
	dist 	= './dist',
	stage   = 'CHANGE-ME',
	prod    = 'CHANGE-ME';

var cdn;
// var cdn  = '//cdn.com';

const baseConfig = {

	serverport  : 3000,

	assetPath   : process.env.NODE_ENV == 'production' && cdn ? cdn : '/assets', // twig-prod.js

	srcPaths: {
		root    	: src,
		html    	: src + '/**/*.html',
		data    	: {
			config  : 'config.js', // global sg data
			all     : src + '/assets/data/**/*.json', // dir of data
		}
	},

	destPaths: {
		root    	: dist,
	},

	// // Google pagespeed
	// URL         : 'http://domain.com',
	// strategy    : 'mobile',

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