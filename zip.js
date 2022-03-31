#!/usr/bin/env node

const RESET = '\x1b[0m';
const BRIGHT = '\x1b[1m';
const GREENB = '\x1b[1;32m';
const REDB = '\x1b[1;31m';
const YELLOWB = '\x1b[1;33m';

const APPNAME = process.argv[1].substring(process.argv[1].lastIndexOf('/') + 1);
if (process.argv.length != 3) {
	console.log(`Usage: ${APPNAME} . | directory | file`);
	process.exit(1);
}

const SRC = process.argv[2] === '.' ? process.cwd() : process.argv[2];
const fs = require('fs');
if (!fs.existsSync(SRC)) {
	console.log(`${REDB}ERROR:${RESET} '${BRIGHT}${SRC}${RESET}' is not a valid directory.`);
	process.exit(1);
}

const SRCLABEL = fs.lstatSync(SRC).isDirectory() ? 'directory' : 'file';
const rl = require('readline').createInterface({input: process.stdin, output: process.stdout});
rl.question(`${YELLOWB}Would you like to zip the ${SRCLABEL} '${SRC}'? [Y/n]: ${RESET}`, function (CONFIRM) {
	if (CONFIRM === 'n' || CONFIRM === 'N') {
		process.exit(1);
	}

	const path = require('path');
	const SRCPATH = path.dirname(SRC);
	const SRCNAME = path.basename(SRC);
	rl.question(`${YELLOWB}ZIP archive name? ${RESET}`, function (DEST) {
		if (fs.existsSync(DEST)) {
			console.log(`${REDB}ERROR:${RESET} file '${BRIGHT}${DEST}${RESET}' already exists.`);
			process.exit(1);
		}

		const DESTPATH = path.dirname(DEST);
		const DESTNAME = path.basename(DEST);
		if (!fs.existsSync(DESTPATH) || !fs.lstatSync(DESTPATH).isDirectory()) {
			console.log(`${REDB}ERROR:${RESET} '${BRIGHT}${DESTPATH}${RESET}' is not a valid directory.`);
			process.exit(1);
		}

		rl.question(`${YELLOWB}ZIP command line options? ${RESET}`, function (OPTIONS) {
			rl.close();

			require('child_process').exec(
				`cd "${DESTPATH}" && zip -r "${DESTNAME}" "${SRCNAME}" ${OPTIONS}`,
				(error, stdout, stderr) => {
					console.log(stdout);
					if (error) {
						console.log(`${REDB}ERROR:${RESET} ${error.message}`);
						return;
					}
					if (stderr) {
						console.log(`${REDB}STDERR:${RESET} ${stderr}`);
						return;
					}
				},
			);
		});
		rl.write(SRCLABEL === 'directory' ? '-x *node_modules*' : '');
	});
	rl.write(path.join(SRCPATH, `${SRCNAME}.zip`));
});
