#!/usr/bin/env node

const lib = require('./lib.js');

lib.printText('====> Testing colors...', lib.COLORS.YELLOWB);
lib.printText('====> Testing colors...', lib.COLORS.REDB);
lib.printText('====> Testing colors...', lib.COLORS.GREENB);
lib.printText('====> Testing colors...', lib.COLORS.BRIGHT);
console.log('====> Testing colors...');

async function main() {
	if (process.argv.length < 3) {
		console.log(`Usage: ${lib.getAppName()} [.] [file] [directory]`);
		process.exit(1);
	}

	const answer = await lib.prompt('extensions? ');
	console.log('====> answer:', answer);

	console.log('====> ', lib.findFiles(process.cwd(), /.*js$/i));
	process.exit(0);
}

main();
