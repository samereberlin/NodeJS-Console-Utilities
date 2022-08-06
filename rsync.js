#!/usr/bin/env node

const lib = require('./lib.js');

async function main() {
	lib.execCommandAvailableCheck('rsync');

	const args = lib.getArgsFromArgv(2, null, `Usage: ${lib.getAppName()} [rsync_options...] src dest`);

	let dryRunFirst = '';
	do {
		dryRunFirst = await lib.prompt('Would you like to execute --dry-run first? [Y/n]:', 'Y');
	} while (!/^[ny]$/i.test(dryRunFirst));
	dryRunFirst = dryRunFirst.toLowerCase() === 'y';

	if (dryRunFirst) {
		lib.printTextColor('--------------------------------------------------------------------------------');
		lib.printMessage(`rsync --dry-run ${args}`);
		try {
			lib.execCommand(`rsync --dry-run ${args}`);
		} catch (error) {
			lib.printError(`While executing command: rsync --dry-run ${args}`);
			process.exit(0);
		}

		let proceed = '';
		do {
			proceed = await lib.prompt('Are you sure you want to proceed? [Y/n]:', 'Y');
		} while (!/^[ny]$/i.test(proceed));
		proceed = proceed.toLowerCase() === 'y';

		if (!proceed) {
			process.exit(0);
		}
	}

	lib.printTextColor('--------------------------------------------------------------------------------');
	lib.printMessage(`rsync ${args}`);
	try {
		lib.execCommand(`rsync ${args}`);
	} catch (error) {
		lib.printError(`While executing command: rsync ${args}`);
	}
	process.exit(0);
}

main();
