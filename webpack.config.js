// https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.7fqdmcf6c
// https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/
// (future reference if needed)
'use strict';

const _config                   = require('./config.js'); // node config

const webpack					= require('webpack');
const path						= require('path');

// recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience
var FriendlyErrorsWebpackPlugin	= require('friendly-errors-webpack-plugin');
var DashboardPlugin				= require('webpack-dashboard/plugin');

const ExtractTextPlugin			= require('extract-text-webpack-plugin');
const extractCSS				= new ExtractTextPlugin('[name].bundle.css');
var BundleAnalyzerPlugin 		= require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		// Multiple files, bundled together
		app: [
			'./assets/js/app.js',
			// './another.js',
			// './and-another.js'
		],
		// // Multiple files, multiple outputs
		// home: './home.js',
		// events: './events.js',
		// contact: './contact.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	// devtool: 'source-map', // for production - no cache
	devtool: 'eval-source-map', // for dev - with cache
	module: {
		rules: [
			{
				test: /\.(ttf|eot|woff)(\?.*)?$/,
				include: path.resolve(__dirname, 'src'),
				loaders: ['url']
			},
			{
				test: /\.(png|jpg|svg)$/,
				include: path.resolve(__dirname, 'src'),
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
				include: path.resolve(__dirname, 'src'),
				use: [
					'style-loader', // injects inline into dom
					// uncomment to not use injected style tags but output compiled .css in 'dist'
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]___[hash:base64:5]' // name: .scss file name, local: class name
						}
					},
					'sass-loader'
				],

				// // uncomment to not use injected style tags but output compiled .css in 'dist'
				// use: extractCSS.extract([
				// 	'css-loader',
				// 	'sass-loader'
				// ]),
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
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
	node: {
		fs: 'empty'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000
	},
	plugins: [
		// new DashboardPlugin({ port: 3000 }),
		// new webpack.optimize.UglifyJsPlugin(),
		extractCSS,
		new webpack.NamedModulesPlugin(),
		// Common code chunking
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js'
		}),
		new FriendlyErrorsWebpackPlugin(),
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery'
		}),

		// // fully interactive data visualization of our build
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'static'
		// })
	],
};

module.exports = config;