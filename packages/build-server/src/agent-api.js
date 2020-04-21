const axios = require('axios');

/**
 * Run build.
 *
 * @param { String } host
 * @param { Number } port
 *
 * @param {String} id
 * @param {String} repository
 * @param {String} commitHash
 * @param {String} command
 * @returns {Promise<>}
 */
function build({ host, port}, { id, repository, commitHash, command }) {
	return axios.post(`http://${host}:${port}/build`, {
		id,
		repository,
		commitHash,
		command
	});
}

/**
 * Check is agent alive.
 *
 * @param { String } host
 * @param { Number } port
 *
 * @returns {Promise<>}
 */
function isAlive({ host, port}) {
	return axios.get(`http://${host}:${port}/is-alive`)
		.then(() => true)
		.catch(() => false);
}

module.exports = {
	build,
	isAlive
}
