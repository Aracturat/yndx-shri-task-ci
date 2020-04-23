const fs = require('fs');
const child_process = require('child_process')
const util = require('util');
const rimraf = require('rimraf');

const promisifiedExec = util.promisify(child_process.exec);
const promisifiedStat = util.promisify(fs.stat);
const promisifiedMkdir = util.promisify(fs.mkdir);


async function runCommandInDirectory(command, dir) {
	try {
		const result = await promisifiedExec(command, { cwd: dir });

		return {
			stdout: result.stdout,
			stderr: result.stderr,
			success: true
		}
	} catch (err) {
		return {
			stdout: err.stdout,
			stderr: err.stderr,
			success: err.code === 0
		}
	}
}

async function isFileExist(file) {
	try {
		await promisifiedStat(file);

		return true;
	} catch (e) {
		if (e.code === 'ENOENT') {
			return false;
		} else {
			throw e;
		}
	}
}

async function isDirectoryExist(dir) {
	try {
		const stat = await promisifiedStat(dir);

		return stat.isDirectory();
	} catch (e) {
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

async function createDirectory(dir) {
	try {
		await promisifiedMkdir(dir, { recursive: true });
	} catch (err) {
		if (err.code === 'EEXIST') { // curDir already exists!
			return;
		}
		throw err;
	}
}

async function wait(timeout) {
	await new Promise(resolve => setTimeout(resolve, timeout));
}

async function retryIfError(fn, retryCount = 3, timeout = 0) {
	if (retryCount > 0) {
		return await fn().catch(async () => {
			await wait(timeout);
			return await retryIfError(fn, retryCount - 1)
		});
	} else {
		return await fn();
	}
}


module.exports = {
	runCommandInDirectory,
	isDirectoryExist,
	isFileExist,
	removeDirectory,
	createDirectory,
	wait,
	retryIfError
};
