const config	= require('./config.js');
let exec		= require('child_process').exec;
let child;
let path;

const args = process.env.npm_config_argv;
// if no arg passed, allow deployment to staging be default
const env  = JSON.parse(args).original[2] !== undefined ? JSON.parse(args).original[2].replace('--','') : null;

if ( env == 'staging' || !env ) {
	path = `rsync -azP ${config.deploy.staging.source} ${config.deploy.staging.username}@${config.deploy.staging.hostname}:${config.deploy.staging.destination}`;
} {
	path = `rsync -azP ${config.deploy.production.source} ${config.deploy.production.username}@${config.deploy.production.hostname}:${config.deploy.production.destination}`;
}

child = exec(path, function (error, stdout, stderr) {

	// console.log('test');

	if (error !== null) {
		console.log('exec error: ' + error);
	}

});