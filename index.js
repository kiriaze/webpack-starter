const config = require('./config.js');
const path   = require('path');
const fs     = require('fs-extra');
const twig   = require('twig');
const watch  = require('chokidar').watch;
const glob   = require('glob');

// - render
const renderAll = () => {
	glob(config.srcPaths.html, (err, files) => {

		console.log(files);

		files.forEach((file) => {
			console.log(file);
			renderSingle(file);
		});
	});

};

const renderSingle = (file) => {
	
	// console.log('Render Single:', file);
	
	// TODO
	// - get JSON from _data.json here
	// - set base path for twig includes

	let data = {
		items: [
			'foo',
			'bar',
			'baz'
		]
	};

	twig.renderFile(file, data, (err, html) => {

		// console.log(file);

		let base = config.srcPaths.templates;
		
		let parts = file.split('/');
			parts.shift();

		// if in views/pages/ remove views from path
		if ( parts.length > 1 ) {
			parts.splice(0, 2); // flatten path
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