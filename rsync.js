#!/usr/bin/env node

const lib = require('./lib.js');

async function main() {
	lib.execCommandAvailableCheck('rsync');

	const args = lib.getArgsFromArgv(2, null, `Usage: ${lib.getAppName()} [rsync_options...] src dest`);

	const dryRunFirst = await lib.confirm('Would you like to execute --dry-run first? [Y/n]:', ['y', 'n'], 'Y');
	if (dryRunFirst) {
		lib.printTextColor('--------------------------------------------------------------------------------');
		lib.printMessage(`rsync --dry-run ${args}`);
		try {
			lib.execCommand(`rsync --dry-run ${args}`);
		} catch (error) {
			lib.printError(`While executing command: rsync --dry-run ${args}`);
			process.exit(0);
		}

		const proceed = await lib.confirm('Are you sure you want to proceed? [Y/n]:', ['y', 'n'], 'Y');
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
