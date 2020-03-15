const path = require('path');

const {
	isDirectoryExist,
	runCommandInDirectory,
	removeDirectory
} = require('./utils');

const repositoryTempDirectory = path.join(process.cwd(), 'server', '___TEMP___', 'repository');

function getRepositoryUrl(repository) {
	return `https://github.com/${repository}.git`;
}

async function cloneRemoteGithubRepository(repository) {
	removeDirectory(repositoryTempDirectory);

	const repositoryUrl = getRepositoryUrl(repository);
	const command = `git clone ${repositoryUrl} ${repositoryTempDirectory}`;

	return runCommandInDirectory(command);
}

async function getCurrentRepositoryRemoteOrigin() {
	const command = `git config --get remote.origin.url`;

	return runCommandInDirectory(command, repositoryTempDirectory);
}


async function isGithubRepositoryCloned(repository) {
	const isRepositoryDirectoryExist = await isDirectoryExist(repositoryTempDirectory);

	if (isRepositoryDirectoryExist) {
		const repositoryUrl = getRepositoryUrl(repository);
		const currentRepositoryUrl = await getCurrentRepositoryRemoteOrigin();

		return repositoryUrl === currentRepositoryUrl;
	}

	return false;
}

async function getCommitInfo(repository, commitHash) {
	const isRepositoryCloned = await isGithubRepositoryCloned(repository);

	if (!isRepositoryCloned) {
		await cloneRemoteGithubRepository(repository);
	}

	const getCommitAuthorCommand = `git log -1 --format="%an" ${commitHash}`;
	const getCommitMessageCommand = `git log -1 --format="%B" ${commitHash}`;

	try {
		const commitAuthor = await runCommandInDirectory(getCommitAuthorCommand, repositoryTempDirectory);
		const commitMessage = await runCommandInDirectory(getCommitMessageCommand, repositoryTempDirectory);

		return {
			commitHash,
			commitAuthor,
			commitMessage
		};
	}
	catch (err) {
		if (err.stderr.includes('unknown revision or path not in the working tree.')) {
			throw 'Unknown revision';
		}
		else {
			throw err;
		}
	}
}
