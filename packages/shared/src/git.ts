import path from 'path';

import { isDirectoryExist, removeDirectory } from './utils';
import { GitCommands } from './git-commands';


export class Git {
    repositoryTempDirectory: string;
    commands: GitCommands;

    constructor(repositoryTempDirectory?: string) {
        this.repositoryTempDirectory = repositoryTempDirectory || path.join(__dirname, '___TEMP___', 'repository');
        this.commands = new GitCommands(this.repositoryTempDirectory);
    }

    getRepositoryUrl(repository: string) {
        return `https://github.com/${ repository }.git`;
    }

    async removeTempDirectory() {
        await removeDirectory(this.repositoryTempDirectory);
    }

    async cloneRemoteGithubRepository(repository: string) {
        await this.removeTempDirectory();

        const repositoryUrl = this.getRepositoryUrl(repository);

        const result = await this.commands.cloneRemoteRepository(repositoryUrl);
        if (!result.success) {
            if (result.stderr.includes('Repository not found.')) {
                throw 'Repository not found';
            }
            throw result.stderr;
        }

        return result.stdout;
    }

    async getRemoteOrigin() {
        const result = await this.commands.getRemoteOrigin();
        if (!result.success) {
            throw result.stderr;
        }

        return result.stdout;
    }

    async isGithubRepositoryCloned(repository: string) {
        const isRepositoryDirectoryExist = await isDirectoryExist(this.repositoryTempDirectory);

        if (isRepositoryDirectoryExist) {
            const repositoryUrl = this.getRepositoryUrl(repository);
            const currentRepositoryUrl = await this.getRemoteOrigin();

            return repositoryUrl === currentRepositoryUrl;
        }

        return false;
    }

    async actualizeLocalRepository(repository: string) {
        const isRepositoryCloned = await this.isGithubRepositoryCloned(repository);

        if (!isRepositoryCloned) {
            await this.cloneRemoteGithubRepository(repository);
        } else {
            await this.commands.fetchAllBranches();
        }
    }

    async getCommitBranch(repository: string, commitHash: string, mainBranch: string) {
        await this.actualizeLocalRepository(repository);

        const result = await this.commands.getRemoteBranches(commitHash);
        if (!result.success) {
            if (result.stderr.includes('malformed object name')) {
                throw 'Unknown revision';
            }
            throw result.stderr;
        }

        // Convert origin/branchName to branchName and drop HEAD
        const branches = result
            .stdout
            .split('\n')
            .map(e => e.trim().replace('origin/', ''))
            .filter(e => !e.startsWith('HEAD -> '));

        if (branches.includes(mainBranch)) {
            return mainBranch;
        } else {
            return branches[0];
        }
    }

    async getCommitInfo(repository: string, commitHash: string) {
        await this.actualizeLocalRepository(repository);

        const commitAuthorResult = await this.commands.getCommitAuthor(commitHash);
        if (!commitAuthorResult.success) {
            if (commitAuthorResult.stderr.includes('unknown revision or path not in the working tree.')) {
                throw 'Unknown revision';
            } else {
                throw commitAuthorResult.stderr;
            }
        }

        const commitMessageResult = await this.commands.getCommitMessage(commitHash);
        if (!commitMessageResult.success) {
            throw commitMessageResult.stderr;
        }

        return {
            commitHash,
            commitAuthor: commitAuthorResult.stdout,
            commitMessage: commitMessageResult.stdout
        };
    }

    async checkout(repository: string, commitHash: string) {
        await this.actualizeLocalRepository(repository);

        return await this.commands.checkout(commitHash);
    }
}
