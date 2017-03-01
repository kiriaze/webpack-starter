'use strict';

var gulp          		= require('gulp'),
	data          		= require('gulp-data'),
	config 		  		= require('../config'),
	fs					= require('fs'),
	path				= require('path'),
	hb					= require('gulp-hb'),
	gutil				= require('gulp-util'),
	twig 				= require('gulp-twig'),
	handlebars			= require('handlebars'),
	webpackConfig		= require('../../webpack.config.js'),
	exec				= require('child_process').exec;

// pages
// check for empty json
function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

// check if it exists
function fileExists(filePath) {
	try {
		return fs.statSync(filePath).isFile();
	} catch (err) {
		return false;
	}
}

gulp.task('hb', function() {

	// hb
	var hbStream = hb()

		// Partials
		.partials(config.srcPaths.partials)
		.partials(config.srcPaths.modules)

		// Helpers
		.helpers(config.srcPaths.helpers)

		// Data
		.data(config.srcPaths.data.global) // for global vars
		.data(config.srcPaths.root + '/modules/**/_data.json')

	return gulp.src([
			config.srcPaths.root + '/*.html',
			config.srcPaths.root + '/pages/**/*.html'
		])
		.pipe(data(function(file) {
			// console.log(file.path, path.dirname(file.path));
			// check if valid, e.g. empty _data.json files
			if ( fileExists( path.dirname(file.path) + '/_data.json') ) {
				var file = fs.readFileSync(path.dirname(file.path) + '/_data.json');
				if ( isJson(file) ) return JSON.parse(file);
			}
		}))
		.pipe(hbStream)
			// .on('error', notify.onError(function (error) {
			// 	return 'An error occurred while compiling hbs.\nLook in the console for details.\n' + error;
			// }))
		.pipe(gulp.dest(config.destPaths.root))

});

gulp.task('twig', function() {
	return gulp.src([
		'./src/**/*.html',
		// './src/views/**/*.twig'
	])
		.pipe(twig({
			data: function(file) {
				// An object of data to pass to the compiler. If of type function, the Vinyl file object is passed as argument:
				return file.data;
			},
			base: './src/views/templates', // sets the views base folder. extends can be loaded relative to this path
			errorLogToConsole: true, // console log errors
		}))
		.pipe(gulp.dest('./dist')); // output the rendered HTML files to the "dist" directory
});

gulp.watch([
	config.srcPaths.html,
	config.srcPaths.partials,
	config.srcPaths.modules
], [
	'twig',
	// 'hb'
]);

gulp.task('build', function(){

});

gulp.task('wb', function(cb) {
	exec('webpack-dev-server --inline --hot', function (err, stdout, stderr) {
		cb(err);
	});
});

gulp.task('default', [
	'twig',
	// 'hb',
	'wb'
]);
