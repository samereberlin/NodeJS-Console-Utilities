const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({input: process.stdin, output: process.stdout});

module.exports = {
	COLORS: {
		RESET: '\x1b[0m',
		BRIGHT: '\x1b[1m',
		GREENB: '\x1b[1;32m',
		REDB: '\x1b[1;31m',
		YELLOWB: '\x1b[1;33m',
	},

	getFilesDirsFromArgv: function () {
		if (process.argv.length < 3) {
			console.log(`Usage: ${this.getAppName()} [.] [file list] [directory list]`);
			process.exit(1);
		}
		const dirs = [],
			files = [],
			unknown = [],
			unsupported = [];
		for (let index = 2; index < process.argv.length; index++) {
			if (fs.existsSync(process.argv[index])) {
				if (fs.lstatSync(process.argv[index]).isFile()) {
					files.push(process.argv[index]);
				} else if (fs.lstatSync(process.argv[index]).isDirectory()) {
					dirs.push(process.argv[index]);
				} else {
					unsupported.push(process.argv[index]);
				}
			} else {
				unknown.push(process.argv[index]);
			}
		}
		if (unknown.length) {
			this.printError(`Unknown files/directories: ${unknown.join(', ')}`);
		}
		if (unsupported.length) {
			this.printError(`Unsupported files/directories: ${unknown.join(', ')}`);
		}
		if (unknown.length || unsupported.length) {
			process.exit(1);
		}
		return {files, dirs};
	},

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

	printError: function (text, title = 'ERROR =>') {
		console.log(`${this.printSetTextColor(title, this.COLORS.REDB)} ${text}`);
	},

	printMessage: function (text, title = `${this.getAppName()} =>`) {
		console.log(`${this.printSetTextColor(title, this.COLORS.GREENB)} ${text}`);
	},

	printSetTextColor: function (text, color = this.COLORS.GREENB) {
		return `${color}${text}${this.COLORS.RESET}`;
	},

	printTextColor: function (text, color = '') {
		console.log(this.printSetTextColor(text, color));
	},

	prompt: function (text) {
		return new Promise((resolve) => {
			rl.question(`${this.printSetTextColor(text, this.COLORS.YELLOWB)}`, resolve);
		});
	},
};
