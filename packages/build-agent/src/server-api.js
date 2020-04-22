const axios = require('axios');

const instance = axios.create({
	baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`
});


/**
 * Notify build server about new agent.
 *
 * @param {String} host
 * @param {String} port
 * @returns {Promise<>}
 */
function notifyAgent({ port }) {
	return instance.post('/notify-agent', {
		port
	});
}

/**
 * Notify build server about build result.
 *
 * @param {String} id
 * @param {Boolean} success
 * @param {Number} duration
 * @param {String} log
 * @returns {Promise<>}
 */
function notifyBuildResult({ id, success, duration, log }) {
	return instance.post('/notify-build-result', {
		id,
		success,
		duration,
		log
	});
}

module.exports = {
	notifyAgent,
	notifyBuildResult
}
