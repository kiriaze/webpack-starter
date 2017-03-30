// https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.7fqdmcf6c
// https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/
// (future reference if needed)
'use strict';

const baseConfig                = require('./config.js'); // node config
const webpack					= require('webpack');
const path						= require('path');
const autoprefixer              = require('autoprefixer');

const ExtractTextPlugin			= require('extract-text-webpack-plugin');

// Extract all css into one file
const extractCSS				= new ExtractTextPlugin({
									filename: 'assets/css/[name].bundle.css',
									// allChunks: true // testing
								});

const CopyWebpackPlugin         = require('copy-webpack-plugin'); // copy other files to dist; e.g. php files, images, etc


const config = {
	context: path.resolve(__dirname, baseConfig.srcPaths.root),
	entry: {

		// // Multiple files, bundled together
		// app: [
		// 	'./assets/js/app.js',
		// ],

		// multi page app - separate files
		'main': './assets/js/app.js',
		'about': './views/pages/about.js',
	},
	output: {
		path: path.resolve(__dirname, baseConfig.destPaths.root),
		filename: 'assets/js/[name].bundle.js'
	},
	// devtool: 'source-map', // for production - no cache (errors out when using uglifyjsplugin)
	module: {
		rules: [
			{
				test: /\.(ttf|eot|woff)(\?.*)?$/,
				include: path.resolve(__dirname, baseConfig.srcPaths.root),
				loaders: ['url']
			},
			{
				test: /\.(png|jpg|svg)$/,
				include: path.resolve(__dirname, baseConfig.srcPaths.root),
				use: [{
					loader: 'url-loader',
					options: {
						// Convert images < 10k to base64 strings
						limit: 10000
					}
				}]
			},
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, baseConfig.srcPaths.root),

				// uncomment to not use injected style tags but output compiled .css in baseConfig.destPaths.root
				use: extractCSS.extract([
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer()]
						}
					},
					'sass-loader'
				]),
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, baseConfig.srcPaths.root),
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			}
		]
	},
	plugins: [

		// Minification and size optimization
	
		extractCSS,

		// new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } }),
		// The DefinePlugin allows you to create global constants which can be configured at compile time. This can be very useful for allowing different behaviour between development builds and release builds. For example, you might use a global constant to determine whether logging takes place; perhaps you perform logging in your development build but not in the release build. That’s the sort of scenario the DefinePlugin facilitates.
		
		new webpack.optimize.UglifyJsPlugin({
			sourcemap: true,
			compress: {
				warnings: true,
				screw_ie8: true,
				drop_console: true
			},
			output: {
				comments: false
			},
			mangle: {
				screw_ie8: true
			}
		}),

		new CopyWebpackPlugin([
			{
				from: 'php-test.php',
				// to: '/php-test.php'
			},
			{
				from: 'assets/images/',
				to: 'assets/images/'
			},
		], {
			// debug: true
		}),

		// Common code chunking
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: './assets/js/vendor.js'
		}),
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery'
		})
	],
};

module.exports = config;