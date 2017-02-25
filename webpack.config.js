'use strict';

const webpack					= require('webpack');
const path						= require('path');
// var autoprefixer				= require('autoprefixer');

// recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experienc
var FriendlyErrorsWebpackPlugin	= require('friendly-errors-webpack-plugin');
var DashboardPlugin				= require('webpack-dashboard/plugin');
var HtmlWebpackPlugin			= require('html-webpack-plugin');
const ExtractTextPlugin			= require('extract-text-webpack-plugin');

const config = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		// Multiple files, bundled together
		app: [
			'webpack-dev-server/client?http://localhost:3000', // gulp
			'webpack/hot/dev-server', // gulp
			'./app.js',
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
		// publicPath: './dist/',
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
						// Convert images < 10k to base64 strings
						limit: 10000
					}
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
			}
		]
	},
	plugins: [
		// new DashboardPlugin({ port: 3000 }),
		// new webpack.optimize.UglifyJsPlugin(),
		new webpack.NamedModulesPlugin(),
		// Common code chunking
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js'
		}),
		new ExtractTextPlugin('[name].bundle.css'),
		// each page needs its own instance?
		new HtmlWebpackPlugin({
			template: __dirname + '/dist/index.html',
			filename: 'index.html'
		}),
		new FriendlyErrorsWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(), // gulp
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery'
		})
	]
};

module.exports = config;
