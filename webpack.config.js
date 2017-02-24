'use strict';

// module.exports = require('./config'); // load all from config dir

// Note: Doesnt create /dist/ dir due to webpack-dev-server, which loads everything in memory - for production, run `npm run build` to create dist dir.

const webpack	= require('webpack');
const path		= require('path');
// var autoprefixer = require('autoprefixer');

// recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experienc
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// dashboard
var DashboardPlugin = require('webpack-dashboard/plugin');

// meow
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	filename: 'vendor.js'
});

var HtmlWebpackPlugin			= require('html-webpack-plugin');
var HTMLWebpackPluginConfig		= new HtmlWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	// alwaysWriteToDisk: true // in conjunction with html-webpack-harddisk-plugin
});

// var HtmlWebpackHarddiskPlugin	= require('html-webpack-harddisk-plugin');
// var HtmlWebpackHarddickPluginConfig = new HtmlWebpackHarddiskPlugin({
// 	outputPath: path.resolve(__dirname, 'dist')
// });


const ExtractTextPlugin	= require('extract-text-webpack-plugin');
const extractCSS		= new ExtractTextPlugin('[name].bundle.css');


const config = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// publicPath: '/dist/',
		filename: '[name].bundle.js'
	},
	// devtool: 'source-map', // for production - no cache
	devtool: 'eval-source-map', // for dev - with cache
	module: {
		rules: [
			{
				test: /\.(ttf|eot|woff)(\?.*)?$/,
				loaders: ['url']
			},
			{
				test: /\.(png|jpg|svg)$/,
				include: path.resolve(__dirname, 'src'),
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000
					} // Convert images < 10k to base64 strings
				}]
			},
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					'style-loader',
					'css-loader',
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
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader"
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		compress: true,
		port: 3000,
		// stats: 'errors-only',
		// quiet: true, // turn off errors with FriendlyErrorsWebpackPlugin
		// // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
		// // Use "*" to proxy all paths to the specified server.
		// // This is useful if you want to get rid of 'http://localhost:3000/' in script[src],
		// // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
		// proxy: {
		// 	"*": "http://webpack-demo.dev"
		// },
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		extractCommons,
		extractCSS,
		// new webpack.optimize.UglifyJsPlugin(),
		HTMLWebpackPluginConfig,
		new FriendlyErrorsWebpackPlugin(),
		// new NyanProgressPlugin(),
		// new DashboardPlugin({ port: 3000 }),
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery'
		}),
		// HtmlWebpackHarddickPluginConfig // write html files to disk (/dist) when using webpack-dev-server
	]
};

module.exports = config;
