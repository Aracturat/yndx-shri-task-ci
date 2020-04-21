const path = require('path');

const {
	isDirectoryExist,
	removeDirectory
} = require('./utils');

const GitCommands = require('./git-commands');


class Git {
	constructor(repositoryTempDirectory) {
		this.repositoryTempDirectory = repositoryTempDirectory || path.join(__dirname, '___TEMP___', 'repository');
		this.commands = new GitCommands(this.repositoryTempDirectory);
	}

	getRepositoryUrl(repository) {
		return `https://github.com/${repository}.git`;
	}

	async removeTempDirectory() {
		await removeDirectory(this.repositoryTempDirectory);
	}

	async cloneRemoteGithubRepository(repository) {
		await this.removeTempDirectory();

		const repositoryUrl = this.getRepositoryUrl(repository);

		try {
			return await this.commands.cloneRemoteRepository(repositoryUrl);
		} catch (err) {
			if (err.stderr.includes('Repository not found.')) {
				throw 'Repository not found';
			}

			throw err;
		}
	}

	async isGithubRepositoryCloned(repository) {
		const isRepositoryDirectoryExist = await isDirectoryExist(this.repositoryTempDirectory);

		if (isRepositoryDirectoryExist) {
			const repositoryUrl = this.getRepositoryUrl(repository);
			const currentRepositoryUrl = await this.commands.getRemoteOrigin();

			return repositoryUrl === currentRepositoryUrl;
		}

		return false;
	}

	async actualizeLocalRepository(repository) {
		const isRepositoryCloned = await this.isGithubRepositoryCloned(repository);

		if (!isRepositoryCloned) {
			await this.cloneRemoteGithubRepository(repository);
		} else {
			await this.commands.fetchAllBranches();
		}
	}

	async getCommitBranch(repository, commitHash, mainBranch) {
		await this.actualizeLocalRepository(repository);

		try {
			const result = await this.commands.getRemoteBranches(commitHash);

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
		} catch (err) {
			if (err.stderr.includes('malformed object name')) {
				throw 'Unknown revision';
			} else {
				throw err;
			}
		}
	}

	async getCommitInfo(repository, commitHash) {
		await this.actualizeLocalRepository(repository);

		try {
			const commitAuthor = await this.commands.getCommitAuthor(commitHash);
			const commitMessage = await this.commands.getCommitMessage(commitHash);

			return {
				commitHash,
				commitAuthor,
				commitMessage
			};
		} catch (err) {
			if (err.stderr.includes('unknown revision or path not in the working tree.')) {
				throw 'Unknown revision';
			} else {
				throw err;
			}
		}
	}

	async checkout(repository, commitHash) {
		await this.actualizeLocalRepository(repository);

		try {
			await this.commands.checkout(commitHash);

		} catch (err) {
			if (err.stderr.includes('unknown revision or path not in the working tree.')) {
				throw 'Unknown revision';
			} else {
				throw err;
			}
		}
	}
}

module.exports = Git;
