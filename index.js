const config = require('./config.js');
const path   = require('path');
const fs     = require('fs-extra');
const twig   = require('twig');
const glob   = require('glob');

// - data
const data = {};
const renderData = () => {

	glob(config.srcPaths.data.all, (err, files) => {
		files.forEach((file) => {
			data['test'] = JSON.parse(fs.readFileSync( file ));
		});
	});
	return data;

};

// - render
const renderAll = () => {
	
	glob(config.srcPaths.html, (err, files) => {

		files.forEach((file) => {
			// console.log(file);
			renderSingle(file);
		});

	});

};

const renderSingle = (file) => {

	let options = {
		settings: {
			views: config.srcPaths.templates
		},
		data: renderData()
	};

	twig.renderFile(file, options, (err, html) => {

		let parts = file.split('/');
			parts.shift();

		// if in views/pages/ remove views and pages from path
		if ( parts.length > 1 ) {
			parts.splice(0, 1); // flatten path
		}

		file = parts.join('/');

		let dest = config.destPaths.root + '/' + file;

		if ( !err && html ) {
			fs.outputFile(dest, html);
		} else {
			return;
		}

	});

};

renderAll();
