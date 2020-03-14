const https = require('https');
const axios = require('axios');


const instance = axios.create({
	baseURL: 'https://hw.shri.yandex/api/',
	headers: {
		'Authorization': process.env.DB_AUTH_TOKEN,
	},
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
});


/**
 * Get build configuration.
 */
function getBuildConfiguration() {
	return instance
		.get('/conf')
		.then(result => result.data);
}

/**
 * Set build configuration.
 *
 * @param {String} repoName
 * @param {String} buildCommand
 * @param {String} mainBranch
 * @param {Number} period
 * @returns {Promise<>}
 */
function setBuildConfiguration({ repoName, buildCommand, mainBranch, period }) {
	return instance.post('/conf', {
		repoName,
		buildCommand,
		mainBranch,
		period
	});
}

/**
 * Delete build configuration.
 *
 * @returns {Promise<>}
 */
function deleteBuildConfiguration() {
	return instance.delete('/conf');
}

/**
 * Request build.
 *
 * @param {String} commitMessage
 * @param {String} commitHash
 * @param {String} branchName
 * @param {String} authorName
 * @returns {Promise<>}
 */
function requestBuild({ commitMessage, commitHash, branchName, authorName }) {
	return instance.post('/build/request', {
		commitMessage,
		commitHash,
		branchName,
		authorName
	});
}

/**
 * Start build.
 *
 * @param {Number} buildId
 * @param {Date} dateTime
 * @returns {Promise<>}
 */
function startBuild({ buildId, dateTime }) {
	if (!buildId) {
		throw 'buildId parameter is missing';
	}
	if (!dateTime) {
		dateTime = new Date();
	}

	return instance.post('/build/start', {
		buildId,
		dateTime: dateTime.toISOString(),
	});
}

/**
 * Finish build.
 *
 * @param {String} buildId
 * @param {Number} duration
 * @param {Boolean} success
 * @param {String} buildLog
 * @returns {Promise<>}
 */
function finishBuild({ buildId, duration, success, buildLog }) {
	return instance.post('/build/finish', {
		buildId,
		duration,
		success,
		buildLog
	});
}

/**
 * Cancel build.
 *
 * @param {Number} buildId
 * @returns {Promise<>}
 */
function cancelBuild({ buildId }) {
	return instance.post('/build/finish', {
		buildId
	});
}

/**
 * Get list of all builds.
 *
 * @param limit
 * @param offset
 * @returns {Promise<>}
 */
function getBuildList({ limit = 25, offset = 0 }) {
	return instance
		.get('/build/list', {
			params: {
				limit,
				offset
			}
		})
		.then(result => result.data);
}

/**
 * Get build details.
 *
 * @param {String} buildId
 * @returns {Promise<>}
 */
function getBuildDetails({ buildId }) {
	return instance
		.get('/build/list', {
			params: {
				buildId
			}
		})
		.then(result => result.data);
}

/**
 * Get build log.
 *
 * @param {String} buildId
 * @returns {Promise<>}
 */
function getBuildLog({ buildId }) {
	return instance
		.get('/build/log', {
			params: {
				buildId
			}
		})
		.then(result => result.data);
}

module.exports = {
	getBuildConfiguration,
	setBuildConfiguration,
	deleteBuildConfiguration,

	requestBuild,
	startBuild,
	finishBuild,
	cancelBuild,

	getBuildList,
	getBuildDetails,
	getBuildLog
};
