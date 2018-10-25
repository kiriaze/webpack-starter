// https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.7fqdmcf6c
// https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/
// https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96
// (future reference if needed)
'use strict';

const baseConfig                = require('./config.js'); // node config
const webpack					= require('webpack');
const path						= require('path');
const autoprefixer              = require('autoprefixer');

const ip                        = require('ip').address();
const CopyWebpackPlugin         = require('copy-webpack-plugin'); // copy other files to dist; e.g. php files, images, etc

// recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience
// const FriendlyErrorsWebpackPlugin	= require('friendly-errors-webpack-plugin');
// const DashboardPlugin				= require('webpack-dashboard/plugin');

// const BundleAnalyzerPlugin 		    = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {

	mode: 'development',

	context: path.resolve(__dirname, baseConfig.src),
	
	entry: {
		// // Multiple files, bundled together (spa)
		// app: [
		// 	'./assets/js/app.js',
		// 	// './another.js',
		// 	// './and-another.js'
		// ],

		// // Multiple files, multiple outputs (multi page app)
		main: './assets/js/app.js',
		styleguide: './assets/js/styleguide.js'
		
	},
	
	output: {
		path: path.resolve(__dirname, baseConfig.src),
		filename: 'assets/js/[name].bundle.js',
		publicPath: `http://${baseConfig.proxy ? ip : baseConfig.localhost}:${baseConfig.port.webpack}/`,
		chunkFilename: 'assets/js/common.js'
	},
	
	devtool: 'inline-eval-cheap-source-map', // for dev - with cache
	// devtool: 'inline-source-map',

	optimization: {
		minimize: true
	},
	
	performance: {
		hints: process.env.NODE_ENV === 'production' ? "warning" : false
	},
	
	module: {
		rules: [
			{
				test: /\.(ttf|eot|woff)$/,
				include: path.resolve(__dirname, baseConfig.src),
				use: [{
					loader: 'url-loader',
					options: {
						name: 'asses/fonts/[name].[ext]'
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
						limit: 10000,
						name: 'assets/images/[name].[ext]'
					}
				}]
			},
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, baseConfig.src),
				use: [
					'style-loader', // injects inline into dom
					{
						loader: 'css-loader',
						options: {
							root: path.resolve(__dirname, baseConfig.src), // to work with url-loader images name option of 'assets/images/[name].[ext]' so all references in code can be /assets/images/file.ext regardless of where they reside
							sourceMap: true,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer({
								browsers: ['last 2 versions']
							})]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							// sourceMap: true,
							includePaths: [
								'src/modules'
							]
						}
					}
				]
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, baseConfig.src),
				exclude: /node_modules/,
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
	
	node: {
		fs: 'empty'
	},

	devServer: {
		contentBase: path.join(__dirname, baseConfig.src),
		compress: true, // enable gzip compression
		host: baseConfig.localhost,
		port: baseConfig.port.webpack,
		publicPath: `http://${baseConfig.localhost}:${baseConfig.port.webpack}/`,
		historyApiFallback: true, // history api
		headers: { "Access-Control-Allow-Origin": "*" }
	},

	plugins: [
		// new DashboardPlugin(),
		// new webpack.optimize.UglifyJsPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"development"'
			}
		}),

		new CopyWebpackPlugin([
			// copying images so as to reference them in markup
			// with no issues
			{
				from: 'assets/images/',
				to: 'assets/images/'
			},
		], {
			// debug: true
		}),
		
		new webpack.NamedModulesPlugin(), // Now the module names in console and in the source will be by name

		// new FriendlyErrorsWebpackPlugin(),
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