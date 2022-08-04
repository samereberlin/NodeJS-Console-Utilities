#!/usr/bin/env node

const lib = require('./lib.js');

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
	const overwrite = /^[^n]*$/i.test(await lib.prompt('Overwrite input files? [Y/n]:'));

	for (const [index, file] of files.entries()) {
		lib.printMessage(`converting ${index + 1} of ${files.length} files: ${file}`);
		try {
			// TODO: implement output filename engine.
			const output = '???'; // Check NodeJS file name extension API.
			// TODO: implement convert command here.
			await lib.execCommand(`basename ${file}`);
			// RODO: and delete PNG files in case of overwrite === true.
		} catch (error) {
			errorList.push(file);
		}
	}

	// console.log('====> ', lib.findFiles(process.cwd(), /.*js$/i));
	process.exit(0);
}

main();
