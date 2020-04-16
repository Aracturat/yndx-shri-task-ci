const server = require('../server-api');
const utils = require('../utils');
const Git = require('../git');
const git = new Git();

async function build(req, res) {
	const {
		id,
		repository,
		commitHash,
		command
	} = req.body;

	let log = "";
	let status = "";

	try {
		await git.checkout(repository, commitHash);

		log = await utils.runCommandInDirectory(command, git.repositoryTempDirectory);
		status = "Success";
	}
	catch {
		status = "Fail";
	}

	try {
		await server.notifyBuildResult({ id, log, status });
		res.status(200);
	} catch {
		res.status(500).send({ log, error: 'Something is going bad. Maybe build settings is missing.' });
	}
}

module.exports = {
	build
};
