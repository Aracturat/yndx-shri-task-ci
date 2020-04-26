import { API_URL } from '../constants';

import axios from 'axios';
import { Settings } from "@ci-server/config-server/src/models/settings";
import { GetBuildsQuery  } from "@ci-server/config-server/src/models/get-builds-query";
import { BuildIdParams } from "@ci-server/config-server/src/models/build-id-params";
import { Build } from "@ci-server/config-server/src/models/build";
import { BuildLog } from "@ci-server/config-server/src/models/build-log";

const instance = axios.create({
	baseURL: API_URL,
	timeout: 300000
});



/**
 * Get settings.
 */
export function getSettings() {
	return instance
		.get<Settings>('/settings')
		.then(result => result.data);
}

/**
 * Update settings.
 */
export function updateSettings({ repoName, buildCommand, mainBranch, period }: Settings) {
	return instance
		.post<Settings>('/settings', {
			repoName,
			buildCommand,
			mainBranch,
			period
		})
		.then(result => result.data);
}

/**
 * Request build.
 */
export function requestBuild({ commitHash }: { commitHash: string }) {
	return instance
		.post<Build>(`/builds/${commitHash}`)
		.then(result => result.data);
}

/**
 * Get list of all builds.
 */
export function getBuilds({ limit = 25, offset = 0 }: GetBuildsQuery) {
	return instance
		.get<Build[]>('/builds', {
			params: {
				limit,
				offset
			}
		})
		.then(result => result.data);
}

/**
 * Get build.
 */
export function getBuild({ buildId }: BuildIdParams) {
	return instance
		.get<Build>(`/builds/${buildId}`)
		.then(result => result.data);
}

/**
 * Get build logs.
 */
export function getBuildLogs({ buildId }: BuildIdParams) {
	return instance
		.get<BuildLog>(`/builds/${buildId}/logs`)
		.then(result => result.data);
}
