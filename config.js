'use strict';

var src  = 'src',
	dist = 'dist';

const baseConfig = {

	serverport  : 3000,
	debugMode   : true,
	bowerDir    : src + '/assets/vendor' , // ToDo: remove and only use npm?

	srcPaths: {

		root    	: src,

		html    	: src + '/**/*.html',
		partials 	: src + '/partials/**/*.{js,json,twig}',
		modules 	: src + '/modules/**/*.twig',
		templates   : src + '/views/templates/',
		
		data    	: {
			global  : '_data.json', // global sg data
			all     : src + '/assets/data/**/*.json', // dir of data
		},

		styles  	: src + '/assets/scss',
		scripts 	: src + '/assets/js',

		images  	: src + '/assets/images/**/*.{png,jpg,jpeg,gif,svg,ico}',
		vectors     : src + '/assets/images/vectors',
		video   	: src + '/assets/video/**/*',
		audio   	: src + '/assets/audio/**/*',
		fonts   	: src + '/assets/fonts/**/*'
	},

	destPaths: {
		root    	: dist,
		styles  	: dist + '/assets/css',
		scripts 	: dist + '/assets/js',
		images 		: dist + '/assets/images',
		video  		: dist + '/assets/video',
		audio  		: dist + '/assets/audio',
		fonts   	: dist + '/assets/fonts'
	},

	// html: {
	// 	// defaults to false since prism syntax highlighter
	// 	// for styleguide doesnt work with minified html
	// 	minify  : false
	// },

	// // Google pagespeed
	// URL         : 'http://domain.com',
	// strategy    : 'mobile',

	// gzip: {
	// 	src     : src + '/**/*.{html,xml,json,css,js,js.map}',
	// 	dest    : dist + '/',
	// 	options : {

	// 	}
	// },

	// // gulp deploy
	// // set options here
	// deploy: {
	// 	staging: {
	// 		hostname    : '107.170.235.89',
	// 		username    : 'basicagency',
	// 		password    : '',
	// 		destination : '/srv/users/basicagency/apps/keen-staging/public',
	// 		exclude     : []
	// 	},
	// 	production: {
	// 		hostname    : '107.170.235.89',
	// 		username    : 'basicagency',
	// 		password    : '',
	// 		destination : '/srv/users/basicagency/apps/keen/public',
	// 		exclude     : []
	// 	}
	// },

	// // gh-pages default pushes to gh-pages branch.
	// // remoteUrl: '', By default gulp-gh-pages assumes the current working directory is a git repository and uses its remote url. If your gulpfile.js is not in a git repository, or if you want to push to a different remote url ( username.github.io ), you can specify it. Ensure you have write access to the repository.
	// // set branch to master for username.github.io
	// // set source to what dir you want to push to github
	// githubPages: {
	// 	remoteUrl : '',
	// 	branch    : '',
	// 	source    : dist + '/**/*'
	// }

}

module.exports = baseConfig;