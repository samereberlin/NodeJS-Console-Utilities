#!/usr/bin/env node

const lib = require('./lib.js');

async function main() {
	const proceed = await lib.confirm('Would you like to proceed with the beeps? [Y/n]:', ['y', 'n'], 'Y');

	if (proceed) {
		lib.playBeeps();
	}

	process.exit(0);
}

main();
