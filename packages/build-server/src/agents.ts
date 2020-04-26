import { HostPort } from "./models/host-port";

import * as agentApi from './agent-api';

export interface Agent extends HostPort {
	buildId: string | null;
}

let agents: Agent[] = [];

export function addAgent({ host, port }: HostPort) {
	console.log(`[agents] Add agent ${host}:${port}`);

	const existingAgent = agents.filter(e => e.host === host && e.port === port).shift();

	if (existingAgent) {
		console.log(`[agents] Agent with address ${host}:${port} exist, update it`);
		existingAgent.buildId = null;
		return existingAgent;
	}

	const agent = {
		host: host,
		port: port,
		buildId: null
	};

	agents.push(agent);

	return agent;
}

export function removeAgent({ host, port }: HostPort) {
	console.log(`[agents] Remove agent ${host}:${port}`);

	agents = agents.filter(e => !(e.host === host && e.port === port));
}

export async function assignBuild(buildId: string): Promise<HostPort | null> {
	const freeAgent = agents.filter(e => !e.buildId).shift();

	if (!freeAgent) {
		return null;
	}

	const agentConfig = {
		host: freeAgent.host,
		port: freeAgent.port
	}

	const isAgentAlive = await agentApi.isAlive(agentConfig);

	if (!isAgentAlive) {
		console.log(`[agents] ${freeAgent.host}:${freeAgent.port} isn't alive, remove it`);
		removeAgent(agentConfig);

		return assignBuild(buildId);
	}

	freeAgent.buildId = buildId;

	return {
		host: freeAgent.host,
		port: freeAgent.port
	};
}

export function stopBuild(buildId: string) {
	const agent = getAgentByBuildId(buildId);

	if (agent) {
		agent.buildId = null;
	}
}

export function getAllAgents() {
	return agents.map(e => ({ host: e.host, port: e.port }));
}

export function getAgentByBuildId(buildId: string) {
	return agents.filter(e => e.buildId === buildId).shift();
}
