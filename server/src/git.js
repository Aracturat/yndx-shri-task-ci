const path = require('path');

const {
	isDirectoryExist,
	runCommandInDirectory,
	removeDirectory
} = require('./utils');

const repositoryTempDirectory = path.join(__dirname, '___TEMP___', 'repository');

function getRepositoryUrl(repository) {
	return `https://github.com/${repository}.git`;
}

async function cloneRemoteGithubRepository(repository) {
	await removeDirectory(repositoryTempDirectory);

	const repositoryUrl = getRepositoryUrl(repository);
	const command = `git clone ${repositoryUrl} ${repositoryTempDirectory}`;

	try {
		return await runCommandInDirectory(command);
	} catch (err) {
		if (err.stderr.includes('Repository not found.')) {
			throw 'Repository not found';
		}

		throw err;
	}
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

async function fetchAllBranchesForLocalRepository() {
	const command = `git fetch --all`;

	return runCommandInDirectory(command, repositoryTempDirectory);
}

async function actualizeLocalRepository(repository) {
	const isRepositoryCloned = await isGithubRepositoryCloned(repository);

	if (!isRepositoryCloned) {
		await cloneRemoteGithubRepository(repository);
	} else {
		await fetchAllBranchesForLocalRepository();
	}
}

async function getCommitBranch(repository, commitHash, mainBranch) {
	await actualizeLocalRepository(repository);

	const getRemoteBranchCommand = `git branch --contains ${commitHash} -r`;

	try {
		const result = await runCommandInDirectory(getRemoteBranchCommand, repositoryTempDirectory);

		// Convert origin/branchName to branchName and drop HEAD
		const branches = result
			.split('\n')
			.map(e => e.trim().replace('origin/', ''))
			.filter(e => !e.startsWith('HEAD -> '));

		if (branches.includes(mainBranch)) {
			return mainBranch;
		} else {
			return branches[0];
		}
	}
	catch (err) {
		if (err.stderr.includes('malformed object name')) {
			throw 'Unknown revision';
		}
		else {
			throw err;
		}
	}
}

async function getCommitInfo(repository, commitHash) {
	await actualizeLocalRepository(repository);

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

module.exports = {
	getCommitInfo,
	getCommitBranch
};
