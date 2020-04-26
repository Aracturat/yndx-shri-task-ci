import { Build } from "@ci-server/shared/src/db-api-models/build";
import * as db from '@ci-server/shared/src/db-api';
import { retryIfError } from '@ci-server/shared/src/utils';

const GET_NOT_FINISHED_BUILDS_REQUEST_LIMIT = 2000;

export async function getNotFinishedBuilds() {
	const { data: builds } = await retryIfError(
		() => db.getBuildList({
			limit: GET_NOT_FINISHED_BUILDS_REQUEST_LIMIT,
			offset: 0
		}),
		5,
		1000
	);

	return builds
		.filter((e: Build) => e.status === 'Waiting' || e.status === 'InProgress')
		.sort((a: Build, b: Build) => a.buildNumber - b.buildNumber);
}
