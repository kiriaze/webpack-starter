const config = require('./config.js');
const path   = require('path');
const fs     = require('fs-extra');
const twig   = require('twig');
const glob   = require('glob');
const minify = require('html-minifier').minify;


// - data
const data = {
	env: process.env.NODE_ENV,
	// assets: `/${config.assets}/`,
	portPath: `${config.assets}`,
	timestamp: Date.now()
};

const renderData = () => {

	glob(config.data, (err, files) => {
		files.forEach((filePath) => {
			let file     = filePath.split('/').pop(),
				fileName = file.slice(0, -5);
			// console.log(fileName);
			data[fileName] = JSON.parse(fs.readFileSync( filePath ));
		});
	});

	return data;

};

// - render
const renderAll = () => {
	
	glob(config.html, (err, files) => {

		files.forEach((file) => {
			// console.log(file);
			renderSingle(file);
		});

	});

};

const renderSingle = (file) => {

	let options = {
		settings: {
			views: config.src
			// root relative for everything, since issues keeping in sync between twig.js and twig.php for includes of files not located in views dir; e.g. asssets/vectors
		},
		data: renderData()
	};

	twig.renderFile(file, options, (err, html) => {

		let parts = file.split('/');
			parts.shift();

		// if in views/pages/ remove views and pages from path
		if ( parts.length > 1 ) {
			parts.splice(0, 3); // flatten path for dist
		}

		file = parts.join('/');

		let dest = config.dist + file;

		if ( !err && html ) {
			html = minify(html, {
				removeComments: true,
				collapseWhitespace: true
			});
			fs.outputFile(dest, html);
		} else {
			return;
		}

	});

};

renderAll();
