#!/usr/bin/env node

const fs = require('fs');
const lib = require('./lib.js');
const path = require('path');

async function main() {
	lib.execCommandAvailableCheck('ffmpeg');

	const {files, dirs} = lib.getFilesDirsFromArgv();
	if (dirs.length) {
		const findRegExp = new RegExp(await lib.prompt('Regexp filter for directories?', '.*\\.(mpe?g|mov|mp4)$'), 'i');
		for (const dir of dirs) {
			files.push(...lib.findFiles(dir, findRegExp));
		}
	}

	const errorList = [];
	const options = await lib.prompt(
		'FFmpeg options?',
		'-vcodec libx265 -crf 28 -map_metadata 0 -movflags use_metadata_tags',
	);
	const suffix = await lib.prompt('Output file suffix?', '_out');

	let discard = '';
	do {
		discard = await lib.prompt('Discard input files? [Y/n]:', 'Y');
	} while (!/^[ny]$/i.test(discard));
	discard = discard.toLowerCase() === 'y';

	for (const [index, file] of files.entries()) {
		lib.printTextColor('--------------------------------------------------------------------------------');
		lib.printMessage(`encoding ${index + 1} of ${files.length} files: ${file}`);

		const extNameLength = path.extname(file).length;
		if (file.substring(file.length - extNameLength - suffix.length, file.length - extNameLength) === suffix) {
			lib.printError(`${file} (input file already suffixed)`);
			errorList.push(`${file} (input file already suffixed)`);
			continue;
		}

		const output = `${file.substring(0, file.length - extNameLength)}${suffix}.mp4`;
		if (fs.existsSync(output)) {
			lib.printError(`${file} (output file already exists)`);
			errorList.push(`${file} (output file already exists)`);
			continue;
		}

		try {
			await lib.execCommand(`ffmpeg -y -i ${file} ${options} ${output}`);
			if (discard) {
				await lib.execCommand(`rm -f ${file}`);
			}
		} catch (error) {
			lib.printError(`While encoding file: ${file}`);
			errorList.push(file);
		}
	}

	if (errorList.length) {
		lib.printTextColor('--------------------------------------------------------------------------------');
		lib.printError('While encoding files:');
		errorList.forEach((errorItem) => lib.printError('', `\t${errorItem}`));
	}
	process.exit(0);
}

main();
