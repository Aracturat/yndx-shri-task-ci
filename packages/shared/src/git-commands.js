const path = require('path');

const {
	runCommandInDirectory,
} = require('./utils');


class GitCommands {
	constructor(repositoryTempDirectory) {
		this.repositoryTempDirectory = repositoryTempDirectory;
	}

	async cloneRemoteRepository(repositoryUrl) {
		const command = `git clone ${repositoryUrl} ${this.repositoryTempDirectory}`;

		return await runCommandInDirectory(command, path.join(__dirname, '..'));
	}

	async fetchAllBranches() {
		const command = `git fetch --all`;

		return runCommandInDirectory(command, this.repositoryTempDirectory);
	}

	async getRemoteOrigin() {
		const command = `git config --get remote.origin.url`;

		return runCommandInDirectory(command, this.repositoryTempDirectory);
	}

	async getRemoteBranches(commitHash) {
		const getRemoteBranchCommand = `git branch --contains ${commitHash} -r`;

		return await runCommandInDirectory(getRemoteBranchCommand, this.repositoryTempDirectory);
	}

	async getCommitAuthor(commitHash) {
		const command = `git log -1 --format="%an" ${commitHash}`;

		return await runCommandInDirectory(command, this.repositoryTempDirectory);
	}

	async getCommitMessage(commitHash) {
		const command = `git log -1 --format="%B" ${commitHash}`;

		return await runCommandInDirectory(command, this.repositoryTempDirectory);
	}

	async checkout(commitHash) {
		const command = `git checkout ${commitHash}`;

		return await runCommandInDirectory(command, this.repositoryTempDirectory);
	}
}

module.exports = GitCommands;
