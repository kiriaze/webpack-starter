//
'use strict';

const baseConfig                = require('./config.js'); // node config
const webpack					= require('webpack');
const path						= require('path');
const autoprefixer              = require('autoprefixer');

const ip                        = require('ip').address();
const CopyWebpackPlugin         = require('copy-webpack-plugin'); // copy other files to dist; e.g. php files, images, etc

// // recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience
// const FriendlyErrorsWebpackPlugin	= require('friendly-errors-webpack-plugin');
// const BundleAnalyzerPlugin 		    = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let entry = {};
for (const e of baseConfig.entry) entry[e] = `./${baseConfig.assets}/js/${e}.js`;

const config = {

	node: {
		fs: 'empty'
	},

	mode: 'development',

	// devtool: 'cheap-module-eval-source-map', // fastest, otherwise 'inline-source-map'
	// devtool: 'inline-cheap-module-source-map',
	// devtool: 'inline-module-source-map',
	devtool: 'cheap-module-source-map',

	context: path.resolve(__dirname, baseConfig.src),

	entry: entry,
	
	output: {
		path: path.resolve(__dirname, baseConfig.src),
		filename: `${baseConfig.assets}/js/[name].bundle.js`,
		// publicPath: `http://${baseConfig.proxy ? ip : baseConfig.localhost}:${baseConfig.port.webpack}/`
		publicPath: `//${baseConfig.proxy ? ip : baseConfig.localhost}:${baseConfig.port.webpack}/`
	},

	devServer: {
		// https: true,
		disableHostCheck: true, // 3.1.14 hmr issues; quick fix
		host: baseConfig.localhost,
		port: baseConfig.port.webpack,
		historyApiFallback: true, // history api
		compress: true, // enable gzip compression
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	},

	plugins: [

		new webpack.NamedModulesPlugin(),
		new webpack.ProvidePlugin(baseConfig.dependencies),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
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
		

		// new FriendlyErrorsWebpackPlugin(),
		// // fully interactive data visualization of our build
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'static'
		// }),

	],
	
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif|svg|mp4|mp3|ttf|eot|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 8192, // 10000
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.scss$/,
				// // to include other dir; e.g. ./modules/banners/banner-cta/style
				// include: path.resolve(__dirname, baseConfig.src),
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true, // if disabled, prevents FOUC/FOUT, sometimes works..
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.js$/,
				// // to include other dir; e.g. ./modules/banners/banner-cta/style
				// include: path.resolve(__dirname, baseConfig.src),
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader?cacheDirectory',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			}
		]
	},
	
};

module.exports = config;