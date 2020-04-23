const agentApi = require('./agent-api');
let agents = [];

function addAgent({ host, port }) {
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

function removeAgent({ host, port }) {
	console.log(`[agents] Remove agent ${host}:${port}`);

	agents = agents.filter(e => !(e.host === host && e.port === port));
}

async function assignBuild(buildId) {
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

function stopBuild(buildId) {
	const agent = getAgentByBuildId(buildId);

	if (agent) {
		agent.buildId = null;
	}

	console.log(agents)
}

function getAllAgents() {
	return agents.map(e => ({ host: e.host, port: e.port }));
}

function getAgentByBuildId(buildId) {
	return agents.filter(e => e.buildId === buildId).shift();
}

module.exports = {
	addAgent,
	assignBuild,
	stopBuild,
	removeAgent,
	getAllAgents,
	getAgentByBuildId
}
