#!/usr/bin/env node

const lib = require('./lib.js');

async function main() {
	lib.execCommandAvailableCheck('convert');

	const {files, dirs} = lib.getFilesDirsFromArgv();
	lib.printMessage(`files: ${files.join(', ')}`);
	lib.printMessage(`directories: ${dirs.join(', ')}`);

	const answer = await lib.prompt('extensions? ');
	console.log('====> answer:', answer);

	console.log('====> ', lib.findFiles(process.cwd(), /.*js$/i));
	process.exit(0);
}

main();
