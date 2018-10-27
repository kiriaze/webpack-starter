const config = require('./config.js');

const exec = require('child_process').exec;
const ip = require('ip').address();

require('colors');

const serverURL = `http://${config.proxy ? ip : config.localhost}:${config.port.server}`.underline.green;

console.log('Kiriaze™'.bold + ' | '.grey + 'https://kiriaze.com/'.underline.red, '\n');

console.log(`\
Webpack & PHP

- Server running on
  ${serverURL}`, '\n');

exec(`php -S ${config.localhost}:${config.port.server} -t src/`, (e) => {
	if (e !== null) console.log(e);
});