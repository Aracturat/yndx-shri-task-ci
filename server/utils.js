const fs = require('fs');

const child_process = require('child_process')
const util = require('util');

const promisifiedExec = util.promisify(child_process.exec);
const promisifiedStat = util.promisify(fs.stat);
const promisifiedRmdir = util.promisify(fs.rmdir);

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
	await promisifiedRmdir(dir, { recursive: true }).catch(() => {});
}

module.exports = {
	runCommandInDirectory,
	isDirectoryExist,
	removeDirectory
};
