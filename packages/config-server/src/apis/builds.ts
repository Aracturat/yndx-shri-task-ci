import path from 'path';
import { Request, Response } from "express";

import * as db from '@ci-server/shared/src/db-api';
import { FileCache } from '@ci-server/shared/src/file-cache';
import { Git } from '@ci-server/shared/src/git';

import { Build } from '../models/build';
import { BuildLog } from '../models/build-log';
import { GetBuildsQuery } from "../models/get-builds-query";
import { RequestBuildParams } from "../models/request-build-params";
import { BuildIdParams } from "../models/build-id-params";
import { ServerError } from "../models/error";

const git = new Git();

function mapBuild(build: Build): Build {
    return {
        id: build.id,
        buildNumber: build.buildNumber,
        commitMessage: build.commitMessage,
        commitHash: build.commitHash,
        branchName: build.branchName,
        authorName: build.authorName,
        status: build.status,
        start: build.start ? build.start + "Z" : undefined,
        duration: build.duration
    }
}


export async function getBuilds(req: Request<{}, {}, {}, GetBuildsQuery>, res: Response<Build[] | ServerError>) {
    try {
        const buildList = await db.getBuildList({
            limit: req.query.limit,
            offset: req.query.offset
        });

        res.send(buildList.data.map(build => mapBuild(build)));
    } catch (err) {
        res.status(500).send({ error: 'Something is going bad. Maybe build settings is missing.' });
    }
}

export async function requestBuild(req: Request<RequestBuildParams>, res: Response<Build | ServerError>) {
    const commitHash = req.params.commitHash;

    if (!commitHash) {
        return res.status(500).send({ error: 'Commit hash parameter is required' });
    }

    let repoName = null;
    let mainBranch = null;

    try {
        const config = await db.getBuildConfiguration();

        if (config.data) {
            repoName = config.data.repoName;
            mainBranch = config.data.mainBranch;
        }

        if (!repoName || !mainBranch) {
            throw 'wrong settings';
        }
    } catch (err) {
        return res.status(404).send({ error: 'Build settings has not found' });
    }

    let commitInfo = null;
    let commitBranch = null;

    try {
        commitInfo = await git.getCommitInfo(repoName, commitHash);
        commitBranch = await git.getCommitBranch(repoName, commitHash, mainBranch);

        if (!commitInfo) {
            throw 'Missing commit info';
        }

        if (!commitBranch) {
            throw 'Missing commit branch';
        }
    } catch (err) {
        return res.status(500).send({ error: `Git error: ${ err }` });
    }

    try {
        await db.requestBuild({
            commitMessage: commitInfo.commitMessage,
            commitHash: commitInfo.commitHash,
            authorName: commitInfo.commitAuthor,
            branchName: commitBranch
        });

        const newBuild = await db.getBuildList({ limit: 1 }).then(res => res.data[0]);

        res.send(mapBuild(newBuild));
    } catch (err) {
        res.status(500).send({ error: 'Something is going bad' });
    }
}

export async function getBuildDetails(req: Request<BuildIdParams>, res: Response<Build | ServerError>) {
    try {
        const build = await db.getBuildDetails({
            buildId: req.params.buildId
        });

        res.send(mapBuild(build.data));
    } catch (err) {
        return res.status(404).send({ error: 'Build has not found' });
    }
}

const buildLogCache = new FileCache(path.join(__dirname, '../___TEMP___/log-cache'));

export async function getBuildLog(req: Request<BuildIdParams>, res: Response<BuildLog | ServerError>) {
    const buildId = req.params.buildId;

    try {
        let logText;

        if (await buildLogCache.has(buildId)) {
            logText = await buildLogCache.get(buildId);
        } else {
            logText = await db.getBuildLog({
                buildId: buildId
            });

            if (logText) {
                await buildLogCache.add(buildId, logText);
            }
        }

        res.send({
            id: buildId,
            text: logText
        });
    } catch (err) {
        return res.status(404).send({ error: 'Build has not found' });
    }
}
