const agents = [];
let ID = 0;

function addAgent({ host, port }) {
	const existingAgent = agents.filter(e => e.host === host && e.port === port).shift();

	if (existingAgent) {
		existingAgent.buildId = null;
		return existingAgent;
	}

	const agent = {
		id: ID++,
		host: host,
		port: port,
		buildId: null
	};

	agents.push(agent);

	return agent;
}

async function assignBuild(buildId) {
	const freeAgent = agents.filter(e => !e.buildId).shift();

	if (!freeAgent) {
		return null;
	}

	freeAgent.buildId = buildId;

	return {
		host: freeAgent.host,
		port: freeAgent.port
	};
}

function stopBuild(buildId) {
	const agent = agents.filter(e => e.buildId === buildId).shift();

	if (agent) {
		agent.buildId = null;
	}
}

module.exports = {
	addAgent,
	assignBuild,
	stopBuild
}
