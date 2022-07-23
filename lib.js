const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({input: process.stdin, output: process.stdout});

const COLORS = {
	RESET: '\x1b[0m',
	BRIGHT: '\x1b[1m',
	GREENB: '\x1b[1;32m',
	REDB: '\x1b[1;31m',
	YELLOWB: '\x1b[1;33m',
};

module.exports = {
	COLORS,

	findFiles: function (findPath, regexpFilter) {
		const findRecursively = function (currentPath, arrayOfFiles = []) {
			const files = fs.readdirSync(currentPath);
			files.forEach(function (file) {
				const currentPathFile = path.join(currentPath, file);
				if (fs.statSync(currentPathFile).isDirectory()) {
					arrayOfFiles = findRecursively(currentPathFile, arrayOfFiles);
				} else if (!regexpFilter || regexpFilter.test(file)) {
					arrayOfFiles.push(currentPathFile);
				}
			});
			return arrayOfFiles;
		};
		return findRecursively(findPath);
	},

	getAppName: function () {
		return path.basename(process.argv[1]);
	},

	prompt: function (text) {
		return new Promise((resolve) => {
			rl.question(`${COLORS.YELLOWB}${text}${COLORS.RESET}`, resolve);
		});
	},
};
