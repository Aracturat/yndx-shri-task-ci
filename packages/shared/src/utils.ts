import fs from 'fs';
import child_process from 'child_process';
import util from 'util';
import rimraf from 'rimraf';

const promisifiedExec = util.promisify(child_process.exec);
const promisifiedStat = util.promisify(fs.stat);
const promisifiedMkdir = util.promisify(fs.mkdir);


export async function runCommandInDirectory(command: string, dir: string) {
    console.log(`Run command ${command} in directory ${dir}`);

    try {
        const result = await promisifiedExec(command, { cwd: dir });

        return {
            stdout: result.stdout,
            stderr: result.stderr,
            success: true
        };
    } catch (err) {
        return {
            stdout: err.stdout as string,
            stderr: err.stderr as string,
            success: err.code === 0
        };
    }
}

export async function isFileExist(file: string) {
    try {
        await promisifiedStat(file);

        return true;
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        } else {
            throw e;
        }
    }
}

export async function isDirectoryExist(dir: string) {
    try {
        const stat = await promisifiedStat(dir);

        return stat.isDirectory();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        } else {
            throw e;
        }
    }
}

export async function removeDirectory(dir: string) {
    if (await isDirectoryExist(dir)) {
        return new Promise(resolve => rimraf(dir, resolve));
    }
}

export async function createDirectory(dir: string) {
    try {
        await promisifiedMkdir(dir, { recursive: true });
    } catch (err) {
        if (err.code === 'EEXIST') { // curDir already exists!
            return;
        }
        throw err;
    }
}

export async function wait(timeout: number) {
    await new Promise(resolve => setTimeout(resolve, timeout));
}

export async function retryIfError<T>(fn: () => Promise<T>, retryCount = 3, timeout = 0): Promise<T> {
    if (retryCount > 0) {
        return await fn().catch(async () => {
            await wait(timeout);
            return await retryIfError(fn, retryCount - 1);
        });
    } else {
        return await fn();
    }
}
