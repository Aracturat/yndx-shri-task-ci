import path from 'path';

import { runCommandInDirectory } from './utils';


export class GitCommands {
    repositoryTempDirectory: string;

    constructor(repositoryTempDirectory: string) {
        this.repositoryTempDirectory = repositoryTempDirectory;
    }

    async cloneRemoteRepository(repositoryUrl: string) {
        const command = `git clone "${ repositoryUrl }" "${ this.repositoryTempDirectory }"`;

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

    async getRemoteBranches(commitHash: string) {
        const getRemoteBranchCommand = `git branch --contains ${ commitHash } -r`;

        return await runCommandInDirectory(getRemoteBranchCommand, this.repositoryTempDirectory);
    }

    async getCommitAuthor(commitHash: string) {
        const command = `git log -1 --format="%an" ${ commitHash }`;

        return await runCommandInDirectory(command, this.repositoryTempDirectory);
    }

    async getCommitMessage(commitHash: string) {
        const command = `git log -1 --format="%B" ${ commitHash }`;

        return await runCommandInDirectory(command, this.repositoryTempDirectory);
    }

    async checkout(commitHash: string) {
        const command = `git checkout ${ commitHash }`;

        return await runCommandInDirectory(command, this.repositoryTempDirectory);
    }
}
