// https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.7fqdmcf6c
// https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/
// https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96
// (future reference if needed)
'use strict';

const baseConfig                = require('./config.js'); // node config
const webpack					= require('webpack');
const path						= require('path');
const autoprefixer              = require('autoprefixer');

// recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience
const FriendlyErrorsWebpackPlugin	= require('friendly-errors-webpack-plugin');
const DashboardPlugin				= require('webpack-dashboard/plugin');

const BundleAnalyzerPlugin 		    = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	context: path.resolve(__dirname, baseConfig.srcPaths.root),
	entry: {
		// // Multiple files, bundled together (spa)
		// app: [
		// 	'./assets/js/app.js',
		// 	// './another.js',
		// 	// './and-another.js'
		// ],

		// // Multiple files, multiple outputs (multi page app)
		main: './assets/js/app.js',
		about: './views/pages/about.js',
		
	},
	output: {
		path: path.resolve(__dirname, baseConfig.destPaths.root),
		filename: 'assets/js/[name].bundle.js',
		publicPath: 'http://localhost:3000/' // subdir page hmr to work
	},
	devtool: 'eval-source-map', // for dev - with cache
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

				use: [
					'style-loader', // injects inline into dom
					'css-loader?sourceMap',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer({
								browsers: ['last 2 versions']
							})]
						}
					},
					{
						loader: 'sass-loader?sourceMap',
						options: {
							includePaths: [
								'src/modules'
							]
						}
					}
				]
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
	node: {
		fs: 'empty'
	},
	devServer: {
		contentBase: path.join(__dirname, baseConfig.destPaths.root),
		compress: true, // enable gzip compression
		port: baseConfig.serverport,
		historyApiFallback: true // history api
	},
	plugins: [
		// new DashboardPlugin({ port: 3000 }),
		// new webpack.optimize.UglifyJsPlugin(),
		
		new webpack.NamedModulesPlugin(), // Now the module names in console and in the source will be by name

		// Common code chunking
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: './assets/js/vendor.js'
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