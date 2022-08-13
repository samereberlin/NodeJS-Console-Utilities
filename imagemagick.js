#!/usr/bin/env node

const fs = require('fs');
const lib = require('./lib.js');
const path = require('path');

async function main() {
	lib.execCommandAvailableCheck('convert');

	const {files, dirs} = lib.getFilesDirsFromArgv();
	if (dirs.length) {
		const findRegExp = new RegExp(await lib.prompt('Regexp filter for directories?', '.*\\.(jpe?g|png)$'), 'i');
		for (const dir of dirs) {
			files.push(...lib.findFiles(dir, findRegExp));
		}
	}

	const errorList = [];
	const options = await lib.prompt('Convert options?', '-resize 3840x\\> -quality 85');
	const suffix = await lib.prompt('Output file suffix?', '_out');
	const discard = await lib.confirm('Discard input files? [y/N]:', 'N');

	for (const [index, file] of files.entries()) {
		lib.printTextColor('--------------------------------------------------------------------------------');
		lib.printMessage(`converting ${index + 1} of ${files.length} files: ${file}`);

		const extNameLength = path.extname(file).length;
		if (file.substring(file.length - extNameLength - suffix.length, file.length - extNameLength) === suffix) {
			lib.printError(`${file} (input file already suffixed)`);
			errorList.push(`${file} (input file already suffixed)`);
			continue;
		}

		const output = `${file.substring(0, file.length - extNameLength)}${suffix}.jpg`;
		if (fs.existsSync(output)) {
			lib.printError(`${file} (output file already exists)`);
			errorList.push(`${file} (output file already exists)`);
			continue;
		}

		try {
			lib.execCommand(`convert ${file} ${options} ${output}`);
			if (discard) {
				lib.execCommand(`rm -f ${file}`);
			}
		} catch (error) {
			lib.printError(`While converting file: ${file}`);
			errorList.push(file);
		}
	}

	if (errorList.length) {
		lib.printTextColor('--------------------------------------------------------------------------------');
		lib.printError('While converting files:');
		errorList.forEach((errorItem) => lib.printError('', `\t${errorItem}`));
	}
	process.exit(0);
}

main();
