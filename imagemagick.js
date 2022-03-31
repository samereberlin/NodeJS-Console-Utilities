#!/usr/bin/env node

const lib = require('./lib.js');

if (process.argv.length != 3) {
	console.log(`Usage: ${lib.getAppName()} . | directory | file`);
	process.exit(1);
}


console.log("====> ", lib.findFiles(process.cwd(), /.*txt$/i));
