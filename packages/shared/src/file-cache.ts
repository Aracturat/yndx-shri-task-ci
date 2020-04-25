import path from 'path';
import fs from 'fs';
import util from 'util';
import { createDirectory, isFileExist } from './utils';

const promisifiedWriteFile = util.promisify(fs.writeFile);
const promisifiedReadFile = util.promisify(fs.readFile);

export class FileCache {
    folder: string;

    constructor(folder: string) {
        this.folder = folder;
        createDirectory(this.folder);
    }

    async add(key: string, value: string) {
        const keyPath = path.join(this.folder, key);

        await promisifiedWriteFile(keyPath, value);
    }

    async has(key: string) {
        const keyPath = path.join(this.folder, key);

        return await isFileExist(keyPath);
    }

    async get(key: string) {
        if (await this.has(key)) {
            const keyPath = path.join(this.folder, key);

            return await promisifiedReadFile(keyPath, { encoding: 'utf-8' });
        } else {
            throw 'key has not found';
        }
    }
}
