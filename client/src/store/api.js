const axios = require('axios');

const apiUrl = 'http://localhost:3005/api/';

const instance = axios.create({
	baseURL: apiUrl
});



/**
 * Get settings.
 */
export function getSettings() {
	return instance
		.get('/settings')
		.then(result => result.data);
}

/**
 * Update settings.
 *
 * @param {String} repoName
 * @param {String} buildCommand
 * @param {String} mainBranch
 * @param {Number} period
 * @returns {Promise<>}
 */
export function updateSettings({ repoName, buildCommand, mainBranch, period }) {
	return instance
		.post('/settings', {
			repoName,
			buildCommand,
			mainBranch,
			period
		})
		.then(result => result.data);
}

/**
 * Request build.
 *
 * @param {String} commitHash
 * @returns {Promise<>}
 */
export function requestBuild({ commitHash}) {
	return instance
		.post(`/builds/${commitHash}`)
		.then(result => result.data);
}

/**
 * Get list of all builds.
 *
 * @param limit
 * @param offset
 * @returns {Promise<>}
 */
export function getBuilds({ limit = 25, offset = 0 }) {
	return instance
		.get('/builds', {
			params: {
				limit,
				offset
			}
		})
		.then(result => result.data);
}

/**
 * Get build.
 *
 * @param {String} buildId
 * @returns {Promise<>}
 */
export function getBuild({ buildId }) {
	return instance
		.get(`/builds/${buildId}`)
		.then(result => result.data);
}

/**
 * Get build logs.
 *
 * @param {String} buildId
 * @returns {Promise<>}
 */
export function getBuildLogs({ buildId }) {
	return instance
		.get(`/build/${buildId}/logs`)
		.then(result => result.data);
}
