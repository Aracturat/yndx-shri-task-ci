const dbApi = require('@ci-server/shared/src/db-api');
const agentApi = require('./agent-api');
const { getNotFinishedBuilds } = require('./utils');
const { assignBuild } = require('./agents');

const CHECK_NEW_BUILD_TIMEOUT_MS = 10000;

function checkWaitingBuilds() {
	console.log('[checkWaitingBuilds] Starting check waiting builds watcher...');

	let isRunning = true;

	async function checkWaitingBuildsInternal() {
		if (!isRunning) {
			return;
		}

		console.log('[checkWaitingBuilds] Starting new iteration...');

		let waitingBuilds = [];
		try {
			console.log('[checkWaitingBuilds] Get not finished builds from DB');
			const builds = await getNotFinishedBuilds();

			waitingBuilds = builds.filter(e => e.status === 'Waiting');

			console.log(`[checkWaitingBuilds] Found ${waitingBuilds.length} builds`);
		} catch (err) {
			console.error(`[checkWaitingBuilds] Can't get finished builds, error ${err}`);
		}

		if (waitingBuilds.length > 0) {
			let config = null;

			try {
				console.log('[checkWaitingBuilds] Get configuration from DB');
				config = (await dbApi.getBuildConfiguration()).data;
				console.log('[checkWaitingBuilds] Configuration successfully loaded');

			} catch (err) {
				console.error(`[checkWaitingBuilds] Can't get configuration, error ${err}`);
			}

			if (config && config.repoName) {
				for (const build of waitingBuilds) {
					try {
						console.log(`[checkWaitingBuilds] Get free agent for build ${build.id}`);

						const agent = await assignBuild(build.id);

						if (!agent) {
							console.log(`[checkWaitingBuilds] Agent has not found =(`);
							break;
						}
						console.log(`[checkWaitingBuilds] Agent found: ${agent.host}:${agent.port}`);

						console.log(`[checkWaitingBuilds] Send build command to agent.`);

						await agentApi.build(agent, {
							repository: config.repoName,
							command: config.buildCommand,
							id: build.id,
							commitHash: build.commitHash
						});
						console.log(`[checkWaitingBuilds] Build command has been successfully sent.`);

						console.log(`[checkWaitingBuilds] Send start build info to DB.`);

						await dbApi.startBuild({ buildId: build.id });

						console.log(`[checkWaitingBuilds] DB updated.`);
					} catch (err) {
						console.error(`[checkWaitingBuilds] Error during of assignment: ${err}`)
					}
				}
			}
		}

		setTimeout(checkWaitingBuildsInternal, CHECK_NEW_BUILD_TIMEOUT_MS);
	}

	checkWaitingBuildsInternal();

	return {
		stop() {
			isRunning = false;
		}
	};
}

module.exports = {
	checkWaitingBuilds
}
