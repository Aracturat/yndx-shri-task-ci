const { runBuild } = require('../build-runner');

async function build(req, res) {
	const {
		id,
		repository,
		commitHash,
		command
	} = req.body;

	console.log(`Get new build request, buildId: ${id}`);

	setTimeout(() => runBuild({ id, repository, commitHash, command }), 0);

	res.status(200).send({});
}

async function isAlive(req, res) {
	console.log(`Get new alive request`);

	res.send({});
}

module.exports = {
	build,
	isAlive
};
