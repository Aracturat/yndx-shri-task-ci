const db = require('@ci-server/shared/src/db-api');

const GET_NOT_FINISHED_BUILDS_REQUEST_LIMIT = 2000;

async function retryIfError(fn, retryCount) {
	if (retryCount > 0) {
		return await fn().catch(() => retryIfError(fn, retryCount - 1));
	} else {
		return await fn();
	}
}

async function getNotFinishedBuilds() {
	const { data: builds } = await retryIfError(
		() => db.getBuildList({
			limit: GET_NOT_FINISHED_BUILDS_REQUEST_LIMIT,
			offset: 0
		}),
		5
	);

	const notFinishedBuilds = builds.filter(e => e.status === 'Waiting' || e.status === 'InProgress');

	return notFinishedBuilds;
}

module.exports = {
	retryIfError,
	getNotFinishedBuilds
}
