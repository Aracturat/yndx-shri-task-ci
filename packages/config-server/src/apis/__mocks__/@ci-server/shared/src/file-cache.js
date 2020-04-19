class FileCache {
	cache = {};

	constructor(folder) {
	}

	async add(key, value) {
		this.cache[key] = value;
	}

	async has(key) {
		return !!this.cache[key];
	}

	async get(key) {
		if (await this.has(key)) {
			return this.cache[key];
		} else {
			throw 'key has not found';
		}
	}
}

module.exports = FileCache;
