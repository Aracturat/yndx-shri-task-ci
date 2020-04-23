const db = require('@ci-server/shared/src/db-api');
const { retryIfError } = require('@ci-server/shared/src/utils');

const GET_NOT_FINISHED_BUILDS_REQUEST_LIMIT = 2000;

async function getNotFinishedBuilds() {
	const { data: builds } = await retryIfError(
		() => db.getBuildList({
			limit: GET_NOT_FINISHED_BUILDS_REQUEST_LIMIT,
			offset: 0
		}),
		5,
		1000
	);

	return builds
		.filter(e => e.status === 'Waiting' || e.status === 'InProgress')
		.sort((a, b) => a.buildNumber - b.buildNumber);
}

module.exports = {
	retryIfError,
	getNotFinishedBuilds
}
