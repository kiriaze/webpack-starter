'use strict';

const baseConfig                = require('./config.js'); // node config
const webpack					= require('webpack');
const path						= require('path');
const autoprefixer              = require('autoprefixer');

const MiniCssExtractPlugin		= require('mini-css-extract-plugin');

// // Extract all css into one file
// const extractCSS				= new MiniCssExtractPlugin({
// 									filename: 'assets/css/[name].bundle.css',
// 									// allChunks: true // testing
// 								});

const CopyWebpackPlugin         = require('copy-webpack-plugin');

let entry = {};
for (const e of baseConfig.entry) entry[e] = `./${baseConfig.assets}/js/${e}.js`;

const config = {

	mode: 'production',
	
	context: path.resolve(__dirname, baseConfig.src),

	// devtool: 'source-map', // for production - no cache (errors out when using uglifyjsplugin)
	
	optimization: {
		minimize: true
	},

	performance: {
		hints: "warning"
	},
	
	entry: entry,

	output: {
		// path: path.resolve(__dirname, baseConfig.dist),
		// filename: 'assets/js/[name].bundle.js',
		// chunkFilename: 'assets/js/common.js'

		publicPath: '/',
		path: path.resolve(__dirname, baseConfig.dist),
		filename: `${baseConfig.assets}/js/[name].bundle.js`
	},
	
	plugins: [

		new webpack.ProvidePlugin(baseConfig.dependencies),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		// extractCSS,
		new MiniCssExtractPlugin({
			filename: `${baseConfig.assets}/css/[name].bundle.css`
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
		})

	],

	module: {
		rules: [

			{
				test: /\.(jpg|png|gif|svg|mp4|mp3)$/,
				loader: 'url-loader',
				options: {
					limit: 8192, // 10000
					name: `[path][name].[ext]`
				}
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				// exclude: /node_modules/,
				loader: 'url-loader',
				options: {
					name: `${baseConfig.assets}/fonts/[name].[ext]`
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					// MiniCssExtractPlugin.loader,
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../../', // so bg images that are referenced like ../images/name.png work in prod
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			}

			// {
			// 	test: /\.(ttf|eot|woff)$/,
			// 	include: path.resolve(__dirname, baseConfig.src),
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			name: 'assets/fonts/[name].[ext]'
			// 		}
			// 	}]
			// },
			// {
			// 	test: /\.(png|jpg|svg)$/,
			// 	include: path.resolve(__dirname, baseConfig.src),
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			// Convert images < 10k to base64 strings
			// 			limit: 10000
			// 		}
			// 	}]
			// },
			// {
			// 	test: /\.scss$/,
			// 	include: path.resolve(__dirname, baseConfig.src),

			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		'css-loader',
			// 		'postcss-loader',
			// 		'sass-loader'
			// 	],
			// },
			// {
			// 	test: /\.js$/,
			// 	include: path.resolve(__dirname, baseConfig.src),
			// 	use: [
			// 		{
			// 			loader: 'babel-loader',
			// 			options: {
			// 				// presets: ['es2015']
			// 				presets: ['@babel/preset-env']
			// 			}
			// 		}
			// 	]
			// }
		]
	},
	
};

module.exports = config;