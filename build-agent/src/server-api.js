const axios = require('axios');

const instance = axios.create({
	baseURL: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
});


/**
 * Get build configuration.
 */
function notifyAgent() {
	return instance
		.port('/notify-agent')
		.then(result => result.data);
}

/**
 * Notify build server about new agent.
 *
 * @param {String} host
 * @param {String} port
 * @returns {Promise<>}
 */
function notifyAgent({ host, port }) {
	return instance.post('/notify-agent', {
		host,
		port
	});
}

/**
 * Notify build server about build result.
 *
 * @param {String} id
 * @param {Number} status
 * @param {String} log
 * @returns {Promise<>}
 */
function notifyBuildResult({ id, status, log }) {
	return instance.post('/notify-agent', {
		id,
		status,
		log
	});
}
