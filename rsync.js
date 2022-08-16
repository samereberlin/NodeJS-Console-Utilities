#!/usr/bin/env node

const lib = require('./lib.js');

async function main() {
	lib.execCommandAvailableCheck('rsync');

	const args = lib.getArgsFromArgv(2, null, `Usage: ${lib.getAppName()} [rsync_options...] src dest`);

	const execCommand = (isDryRun) => {
		const command = `rsync ${isDryRun ? '--dry-run' : ''} ${args}`;
		lib.printTextColor('--------------------------------------------------------------------------------');
		lib.printMessage(command);
		try {
			lib.execCommand(command);
		} catch (error) {
			lib.printError(`While executing command: ${command}`);
			process.exit(1);
		}
		lib.playBeeps();
	};

	if (await lib.confirm('Would you like to execute --dry-run first? [Y/n]:', ['y', 'n'], 'Y')) {
		execCommand(true);
		if (!(await lib.confirm('Are you sure you want to proceed? [Y/n]:', ['y', 'n'], 'Y'))) {
			process.exit(0);
		}
	}

	execCommand(false);
	process.exit(0);
}

main();
