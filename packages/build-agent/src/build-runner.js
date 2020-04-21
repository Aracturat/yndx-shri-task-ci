const path = require('path');
const server = require('./server-api');
const utils = require('@ci-server/shared/src/utils');
const Git = require('@ci-server/shared/src/git');

async function runBuild({ id, repository, commitHash, command }) {
	let log = '';
	let status = '';

	console.log(`Start new build, buildId: ${id}`);

	const tempDirectory = path.join(__dirname, '___TEMP___', 'repository', id);

	const git = new Git(tempDirectory);
	console.log(`Git repository will be cloned in ${git.repositoryTempDirectory}`);

	const startTime = new Date();

	try {
		console.log(`Checkout repository ${repository}, commit hash ${commitHash}`);
		await git.checkout(repository, commitHash);

		console.log(`Checkout successfully finished`);
	} catch (err) {
		console.error(`Checkout failed with error ${err}`);
	}

	try {
		console.log(`Run command in repository ${command}`);
		log = await utils.runCommandInDirectory(command, git.repositoryTempDirectory);
		status = 'Success';

		console.log(`Command successfully finished`);
	} catch (err) {
		status = 'Fail';
		console.error(`Command failed with error ${err}`)
	}

	const duration = Math.floor((new Date() - startTime) / 1000);
	console.log(`Build duration: ${duration}`);

	try {
		console.log('Trying to remove temp directory');
		await git.removeTempDirectory();

		console.log('Temp directory has been successfully removed');
	} catch (err) {
		console.error(`Remove failed with error ${err}`);
	}

	try {
		console.log(`Return result to build server`);
		await server.notifyBuildResult({ id, log, duration, status });

		console.log(`Result successfully returned`);
	} catch (err) {
		console.error(`Result returned with with error ${err}`)
	}
}

module.exports = {
	runBuild
}
