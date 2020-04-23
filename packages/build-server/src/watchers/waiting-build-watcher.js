const dbApi = require('@ci-server/shared/src/db-api');
const agentApi = require('../agent-api');
const { retryIfError } = require('@ci-server/shared/src/utils');
const { getNotFinishedBuilds } = require('../utils');
const { assignBuild } = require('../agents');

const CHECK_NEW_BUILD_TIMEOUT_MS = 30 * 1000;

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
				config = (
					await retryIfError(
						() => dbApi.getBuildConfiguration(),
						5,
						1000
					)
				).data;
				console.log('[checkWaitingBuilds] Configuration successfully loaded');

			} catch (err) {
				console.error(`[checkWaitingBuilds] Can't get configuration, error ${err}`);
			}

			if (config && config.repoName && config.buildCommand) {
				for (const build of waitingBuilds) {
					const found = await findAgentAndSendBuildCommand({
						buildId: build.id,
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

		setTimeout(checkWaitingBuildsInternal, CHECK_NEW_BUILD_TIMEOUT_MS);
	}

	checkWaitingBuildsInternal();

	return {
		stop() {
			isRunning = false;
		}
	};
}

async function findAgentAndSendBuildCommand({ buildId, repoName, buildCommand, commitHash }) {
	try {
		console.log(`[checkWaitingBuilds] Get free agent for build ${buildId}`);

		const agent = await assignBuild(buildId);

		if (!agent) {
			console.log(`[checkWaitingBuilds] Agent has not found =(`);
			return false;
		}
		console.log(`[checkWaitingBuilds] Agent found: ${agent.host}:${agent.port}`);

		console.log(`[checkWaitingBuilds] Send build command to agent.`);

		await agentApi.build(agent, {
			repository: repoName,
			command: buildCommand,
			id: buildId,
			commitHash: commitHash
		});
		console.log(`[checkWaitingBuilds] Build command has been successfully sent.`);

		console.log(`[checkWaitingBuilds] Send start build info to DB.`);

		await retryIfError(
			() => dbApi.startBuild({ buildId: buildId }),
			5,
			1000
		)

		console.log(`[checkWaitingBuilds] DB updated.`);

		return true;
	} catch (err) {
		console.error(`[checkWaitingBuilds] Error during of assignment: ${err}`)
	}

	return false;
}


module.exports = {
	checkWaitingBuilds
}
