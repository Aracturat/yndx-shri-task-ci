const dbApi = require('@ci-server/shared/src/db-api');
const agentApi = require('../agent-api');
const { retryIfError } = require('@ci-server/shared/src/utils');
const { getNotFinishedBuilds } = require('../utils');
const { assignBuild, getAgentByBuildId } = require('../agents');

const CHECK_BUILDS_TIMEOUT_MS = 30 * 1000;

function checkBuilds() {
	console.log('[checkBuilds] Starting check builds watcher...');

	let isRunning = true;

	async function checkBuildsInternal() {
		if (!isRunning) {
			return;
		}

		console.log('[checkBuilds] Starting new iteration...');

		let builds = [];
		try {
			console.log('[checkBuilds] Get not finished builds from DB');
			builds = await getNotFinishedBuilds();

			const waitingBuilds = builds.filter(e => e.status === 'Waiting');
			const inProgressBuilds = builds.filter(e => e.status === 'InProgress');

			console.log(`[checkBuilds] Found ${waitingBuilds.length} waiting builds, ${inProgressBuilds.length} in progress builds`);
		} catch (err) {
			console.error(`[checkBuilds] Can't get finished builds, error ${err}`);
		}

		if (builds.length > 0) {
			let config = null;

			try {
				console.log('[checkBuilds] Get configuration from DB');
				config = (
					await retryIfError(
						() => dbApi.getBuildConfiguration(),
						5,
						1000
					)
				).data;
				console.log('[checkBuilds] Configuration successfully loaded');

			} catch (err) {
				console.error(`[checkBuilds] Can't get configuration, error ${err}`);
			}

			if (config && config.repoName && config.buildCommand) {
				for (const build of builds) {
					// Check agent with this build
					if (build.status === 'InProgress') {
						const agent = getAgentByBuildId(build.id);

						if (agent) {
							console.log(`[checkBuilds] Found agent for build ${build.id}, continue`)

							continue;
						}

						console.log(`[checkBuilds] Found in progress build ${build.id} without agent`)
					}

					const found = await findAgentAndSendBuildCommand({
						buildId: build.id,
						status: build.status,
						commitHash: build.commitHash,
						repoName: config.repoName,
						buildCommand: config.buildCommand
					});

					if (!found) {
						break;
					}
				}
			}
		}

		setTimeout(checkBuildsInternal, CHECK_BUILDS_TIMEOUT_MS);
	}

	setTimeout(checkBuildsInternal, 0);

	return {
		stop() {
			isRunning = false;
		}
	};
}

async function findAgentAndSendBuildCommand({ buildId, status, repoName, buildCommand, commitHash }) {
	try {
		console.log(`[checkBuilds] Get free agent for build ${buildId}`);

		const agent = await assignBuild(buildId);

		if (!agent) {
			console.log(`[checkBuilds] Agent has not found =(`);
			return false;
		}
		console.log(`[checkBuilds] Agent found: ${agent.host}:${agent.port}`);

		console.log(`[checkBuilds] Send build command to agent.`);

		await agentApi.build(agent, {
			repository: repoName,
			command: buildCommand,
			id: buildId,
			commitHash: commitHash
		});
		console.log(`[checkBuilds] Build command has been successfully sent.`);

		// Send command to DB only if build has in waiting status
		if (status === 'Waiting') {
			console.log(`[checkBuilds] Send start build info to DB.`);

			await retryIfError(
				() => dbApi.startBuild({ buildId: buildId }),
				5,
				1000
			)

			console.log(`[checkBuilds] DB updated.`);
		}

		return true;
	} catch (err) {
		console.error(`[checkBuilds] Error during of assignment: ${err}`)
	}

	return false;
}


module.exports = {
	checkBuilds
}
