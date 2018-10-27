const config	= require('./config.js');
let exec		= require('child_process').exec;

const args = process.env.npm_config_argv;

// if no arg passed, allow deployment to staging be default
let env    = JSON.parse(args).original[2] !== undefined ? JSON.parse(args).original[2].replace('--','') : null;

if (env != 'production') env = 'staging';

let cmd = 'rsync -azP';

for (let e of config.deploy[env].exclude) cmd += ` --exclude '${e}'`;
cmd += ` ${config.deploy[env].source} ${config.deploy[env].username}@${config.deploy[env].hostname}:${config.deploy[env].dir}`;

exec(cmd, (e) => {
	if (e !== null) console.log(e);
});
