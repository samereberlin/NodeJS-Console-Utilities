#!/usr/bin/env node

const lib = require('./lib.js');
const path = require('path');

async function main() {
	lib.execCommandAvailableCheck('convert');

	const {files, dirs} = lib.getFilesDirsFromArgv();
	if (dirs.length) {
		const findRegExp = new RegExp(await lib.prompt('Regexp filter for directories?', '.*\\.(jpe?g|png)$'), 'i');
		for (const dir of dirs) {
			files.push(...(await lib.findFiles(dir, findRegExp)));
		}
	}

	const errorList = [];
	const options = await lib.prompt('Convert options?', '-resize 3840x> -quality 85');
	const suffix = await lib.prompt('Output file suffix?', '_out');
	const discard = /^[^n]*$/i.test(await lib.prompt('Discard input files? [Y/n]:', 'Y'));

	for (const [index, file] of files.entries()) {
		lib.printMessage(`converting ${index + 1} of ${files.length} files: ${file}`);
		const output = file.substring(0, file.length - path.extname(file).length) + suffix + '.jpg';

		try {
			// TODO: implement convert command here.
			await lib.execCommand(`basename ${file}`);
			// TODO: and delete input files in case of discard === true.
		} catch (error) {
			errorList.push(file);
		}
	}

	// console.log('====> ', lib.findFiles(process.cwd(), /.*js$/i));
	process.exit(0);
}

main();
