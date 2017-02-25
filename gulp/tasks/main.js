'use strict';

var gulp          		= require('gulp'),
	data          		= require('gulp-data'),
	config 		  		= require('../config'),
	fs					= require('fs'),
	path				= require('path'),
	hb					= require('gulp-hb'),
	handlebars			= require('handlebars'),
	webpack				= require('webpack'),
	webpackStream		= require('webpack-stream'),
	webpackConfig		= require('../../webpack.config.js'),
	WebpackDevServer	= require('webpack-dev-server');

gulp.task('webpack', function() {
	return gulp.src('./src/app.js')
		.pipe(webpackStream({
			config: webpackConfig,
			watch: true
		}, webpack))
		.pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev-server', function() {

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(webpackConfig), {
		stats: {
			colors: true
		},
		hot: true,
		inline: true,
		contentBase: './dist',
		compress: true,
		port: 3000,
		// stats: 'errors-only',
		// quiet: true, // turn off errors with FriendlyErrorsWebpackPlugin
	}).listen(3000, 'localhost', function(err) {
		// if (err) throw new gutil.PluginError('webpack-dev-server', err);
		// gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html');
	});
});

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

gulp.task('pages', function() {

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

gulp.watch([
	config.srcPaths.html,
	config.srcPaths.partials,
	config.srcPaths.modules
], ['pages', 'webpack']);

gulp.task('default', ['pages', 'webpack-dev-server']);
