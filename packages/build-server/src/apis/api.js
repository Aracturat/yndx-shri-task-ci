const db = require('@ci-server/shared/src/db-api');
const { addAgent, stopBuild } = require('../agents');
const { retryIfError } = require('../utils');


async function notifyAgent(req, res) {
	const host = req.hostname;
	const port = req.body.port;

	const agent = addAgent({ host, port });

	res.send(agent);
}

async function notifyBuildResult(req, res) {
	const {
		id,
		success,
		duration,
		log
	} = req.body;

	console.log(`Get build result for build ${id}`);

	try {
		console.log(`Send result to DB for build ${id}`);

		await retryIfError(() => db.finishBuild({
				buildId: id,
				buildLog: log,
				duration,
				success
			}),
			5,
			1000
		);

		stopBuild(id);

		res.send({});
	} catch (err) {
		console.error(`Error during send result to DB, error: ${err}`);
		res.status(500).send({ error: 'Something is going bad.' });
	}
}

module.exports = {
	notifyAgent,
	notifyBuildResult
};
