#!/usr/bin/env node

const lib = require('./lib.js');

console.log(lib.COLORS.YELLOWB + '====> Testing colors...' + lib.COLORS.RESET);

async function main() {
	if (process.argv.length != 3) {
		console.log(`Usage: ${lib.getAppName()} . | directory | file`);
		process.exit(1);
	}

	const answer = await lib.prompt('extensions? ');
	console.log('====> answer:', answer);

	console.log('====> ', lib.findFiles(process.cwd(), /.*js$/i));
	process.exit(0);
}

main();
