const fs = require('fs');
const child_process = require('child_process')
const util = require('util');
const rimraf = require("rimraf");

const promisifiedExec = util.promisify(child_process.exec);
const promisifiedStat = util.promisify(fs.stat);


async function runCommandInDirectory(command, dir = process.cwd()) {
	const result = await promisifiedExec(command, { cwd: dir });

	return result.stdout.trim();
}

async function isDirectoryExist(dir) {
	try {
		const stat = await promisifiedStat(dir);

		return stat.isDirectory();
	}
	catch (e) {
		if (e.code === 'ENOENT') {
			return false;
		} else {
			throw e;
		}
	}
}

async function removeDirectory(dir) {
	if (await isDirectoryExist(dir)) {
		return new Promise(resolve => rimraf(dir, resolve));
	}
}

module.exports = {
	runCommandInDirectory,
	isDirectoryExist,
	removeDirectory
};
