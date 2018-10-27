// https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.7fqdmcf6c
// https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/
// (future reference if needed)
'use strict';

const baseConfig                = require('./config.js'); // node config
const webpack					= require('webpack');
const path						= require('path');
const autoprefixer              = require('autoprefixer');

const MiniCssExtractPlugin		= require('mini-css-extract-plugin');

// Extract all css into one file
const extractCSS				= new MiniCssExtractPlugin({
									filename: 'assets/css/[name].bundle.css',
									// allChunks: true // testing
								});

const CopyWebpackPlugin         = require('copy-webpack-plugin'); // copy other files to dist; e.g. php files, images, etc


const config = {

	mode: 'production',
	
	context: path.resolve(__dirname, baseConfig.src),
	
	entry: {

		// // Multiple files, bundled together
		// app: [
		// 	'./assets/js/app.js',
		// ],

		// multi page app - separate files
		main: './assets/js/app.js',
		styleguide: './assets/js/styleguide.js'
	},

	output: {
		// output dir
		path: path.resolve(__dirname, baseConfig.dist),
		filename: 'assets/js/[name].bundle.js',
		chunkFilename: 'assets/js/common.js'
	},
	
	// devtool: 'source-map', // for production - no cache (errors out when using uglifyjsplugin)
	
	optimization: {
		minimize: true
	},

	module: {
		rules: [
			{
				test: /\.(ttf|eot|woff)$/,
				include: path.resolve(__dirname, baseConfig.src),
				use: [{
					loader: 'url-loader',
					options: {
						name: 'assets/fonts/[name].[ext]'
					}
				}]
			},
			{
				test: /\.(png|jpg|svg)$/,
				include: path.resolve(__dirname, baseConfig.src),
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
				include: path.resolve(__dirname, baseConfig.src),

				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					// 'postcss-loader',
					'sass-loader',
				],

				// // dont use injected style tags but output compiled .css in baseConfig.dist
				// use: extractCSS([
				// 	'css-loader',
				// 	{
				// 		loader: 'postcss-loader',
				// 		options: {
				// 			plugins: () => [autoprefixer()]
				// 		}
				// 	},
				// 	'sass-loader'
				// ]),
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, baseConfig.src),
				use: [
					{
						loader: 'babel-loader',
						options: {
							// presets: ['es2015']
							presets: ['@babel/preset-env']
						}
					}
				]
			}
		]
	},
	plugins: [

		// Minification and size optimization
	
		extractCSS,

		// This makes it possible for us to safely use env vars on our code
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			},
		}),
		// The DefinePlugin allows you to create global constants which can be configured at compile time. This can be very useful for allowing different behaviour between development builds and release builds. For example, you might use a global constant to determine whether logging takes place; perhaps you perform logging in your development build but not in the release build. That’s the sort of scenario the DefinePlugin facilitates.

		new CopyWebpackPlugin([
			{
				from: 'assets/images/',
				to: 'assets/images/'
			},
			{
				from: 'assets/vectors/',
				to: 'assets/vectors/'
			},
			{
				from: 'assets/fonts/',
				to: 'assets/fonts/'
			},
			{
				from: '../.htaccess',
				to: '.htaccess',
				toType: 'file'
			},
			{
				from: '../.htpasswd',
				to: '.htpasswd',
				toType: 'file'
			}
		], {
			// debug: true
		}),

		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery'
		})
	],
};

module.exports = config;