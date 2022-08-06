#!/usr/bin/env node

const lib = require('./lib.js');

async function main() {
	lib.execCommandAvailableCheck('rsync');

	// TODO: const args = lib.getArgsFromArgv(minLength, maxLength, errorMessage);

	let dryRunFirst = '';
	do {
		dryRunFirst = await lib.prompt('Would you like to execute --dry-run first? [Y/n]:', 'Y');
	} while (!/^[ny]$/i.test(dryRunFirst));
	dryRunFirst = dryRunFirst.toLowerCase() === 'y';

	if (dryRunFirst) {
		try {
			lib.execCommand('cp -i 01.txt 02.txt ');
		} catch (error) {
			lib.printError(`While during execution: ${error}`);
		}
		// lib.execCommand(
		// 	'rsync --dry-run -rcv --delete-after --exclude ".DS_Store" --exclude "ios/Pods" --exclude "android/app/build" --exclude "android/.gradle" --exclude "node_modules" -e "ssh -p 2222" /Users/samereberlin/hd/user/1_Meus/ 192.168.8.113:/sdcard/1_Meus/',
		// );
	}

	// TODO: ???

	process.exit(0);
}

main();
