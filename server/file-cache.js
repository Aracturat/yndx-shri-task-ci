const path = require('path');
const fs = require('fs');
const util = require('util');
const { isFileExist, createDirectory } = require('./utils');

const promisifiedWriteFile = util.promisify(fs.writeFile);
const promisifiedReadFile = util.promisify(fs.readFile);

class FileCache {
	constructor(folder) {
		this.folder = folder;
		createDirectory(this.folder);
	}

	async add(key, value) {
		const keyPath = path.join(this.folder, key);

		await promisifiedWriteFile(keyPath, value);
	}

	async has(key) {
		const keyPath = path.join(this.folder, key);

		return await isFileExist(keyPath);
	}

	async get(key) {
		if (this.has(key)) {
			const keyPath = path.join(this.folder, key);

			return await promisifiedReadFile(keyPath, {encoding: 'utf-8'});
		} else {
			throw 'key has not found';
		}
	}
}

module.exports = FileCache;
