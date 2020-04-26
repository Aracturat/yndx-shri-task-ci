import path from 'path';
import * as server from './server-api';
import { retryIfError, runCommandInDirectory } from '@ci-server/shared/src/utils';
import { Git } from '@ci-server/shared/src/git';

function writeToLog(log: string[], message: string, duplicateToConsole = true) {
    log.push(message);

    if (duplicateToConsole) {
        console.log(message);
    }
}

function reportToLog(result: { stdout: string, stderr: string }, log: string[]) {
    writeToLog(log, '\n>>> STDOUT <<<', false);
    writeToLog(log, result.stdout, false);
    writeToLog(log, '>>> STDOUT END <<<\n', false);

    writeToLog(log, '>>> STDERR <<<', false);
    writeToLog(log, result.stderr, false);
    writeToLog(log, '>>> STDERR END <<<\n', false);
}

async function checkout({ git, repository, commitHash, log }: { git: Git, repository: string, commitHash: string, log: string[] }) {
    let success = false;

    try {
        writeToLog(log, `Checkout repository`);

        const result = await git.checkout(repository, commitHash);

        success = result.success;

        reportToLog(result, log);

        if (result.success) {
            writeToLog(log, `Checkout successfully finished`);
        } else {
            writeToLog(log, `Checkout failed`);
        }
    } catch (err) {
        writeToLog(log, `Checkout failed with error:\n ${ err }`);
    }

    return success;
}

async function runCommand({ git, command, log }: { git: Git, command: string, log: string[] }) {
    let success = false;

    try {
        writeToLog(log, `Run command in repository`);

        const result = await runCommandInDirectory(command, git.repositoryTempDirectory);

        success = result.success;

        reportToLog(result, log);

        if (result.success) {
            writeToLog(log, `Command successfully finished`);
        } else {
            writeToLog(log, `Command failed`);
        }
    } catch (err) {
        writeToLog(log, `Command failed with error:\n ${ err }`);
    }

    return success;
}

type RunBuildParams = { id: string; repository: string; commitHash: string; command: string };

export async function runBuild({ id, repository, commitHash, command }: RunBuildParams) {
    let log: string[] = [];
    let success = false;

    console.log(`Start new build, buildId: ${ id }`);

    const tempDirectory = path.join(__dirname, '___TEMP___', 'repository', id);

    const git = new Git(tempDirectory);
    console.log(`Git repository will be cloned in ${ git.repositoryTempDirectory }`);

    const startTime = new Date();

    const isCheckoutSuccessful = await checkout({ git, commitHash, repository, log });

    if (isCheckoutSuccessful) {
        success = await runCommand({ git, command, log });
    }

    const duration = Math.floor((+new Date() - +startTime) / 1000);
    console.log(`Build duration: ${ duration }`);

    try {
        console.log('Trying to remove temp directory');
        await git.removeTempDirectory();

        console.log('Temp directory has been successfully removed');
    } catch (err) {
        console.error(`Remove failed with error ${ err }`);
    }

    try {
        console.log(`Return result to build server`);
        await retryIfError(
            () => server.notifyBuildResult({ id, log: log.join('\n'), duration, success }),
            5,
            1000
        );

        console.log(`Result successfully returned`);
    } catch (err) {
        console.error(`Result returned with with error ${ err }`);
    }
}
