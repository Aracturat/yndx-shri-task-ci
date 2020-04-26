import * as agentApi from '../agent-api';
import { getAllAgents, removeAgent } from '../agents';
import { retryIfError } from '@ci-server/shared/src/utils';

const CHECK_AGENT_TIMEOUT_MS = 60 * 1000;

export function checkAgents() {
	console.log('[checkAgents] Starting check agents watcher...');

	let isRunning = true;

	async function checkAgentsInternal() {
		if (!isRunning) {
			return;
		}

		console.log('[checkAgents] Starting new iteration...');

		const agents = getAllAgents();

		for (const agent of agents) {
			const agentAddress = `${agent.host}:${agent.port}`;

			console.log(`[checkAgents] Check agent ${agentAddress}...`);

			const isAlive = await retryIfError(
				() => agentApi.isAlive(agent),
				3,
				1000
			);

			if (!isAlive) {
				console.log(`[checkAgents] Agent ${agentAddress} is dead, remove it`);

				removeAgent(agent);
			} else {
				console.log(`[checkAgents] Agent ${agentAddress} is alive`);
			}
		}

		setTimeout(checkAgentsInternal, CHECK_AGENT_TIMEOUT_MS);
	}

	checkAgentsInternal();

	return {
		stop() {
			isRunning = false;
		}
	};
}
