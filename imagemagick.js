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
	const suffix = await lib.prompt('Output suffix? (use an empty suffix to overwrite the input file)', '.out.jpg');

	for (const [index, file] of files.entries()) {
		lib.printMessage(`converting ${index + 1} of ${files.length} files: ${file}`);
		try {
			// TODO: implement convert command here, and delete PNG files in case of suffix.length == 0.
			/**/ const resp = await lib.execCommand(`basename ${file}`);
			/**/ console.log('====> resp:', resp);
		} catch (error) {
			errorList.push(file);
		}
	}

	// console.log('====> ', lib.findFiles(process.cwd(), /.*js$/i));
	process.exit(0);
}

main();
