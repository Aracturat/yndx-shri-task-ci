import * as db from '@ci-server/shared/src/db-api';
import { Request, Response } from 'express';

import { Git } from '@ci-server/shared/src/git';

import { Settings } from '../models/settings';
import { ServerError } from '../models/error';

const git = new Git();

export async function getSettings(req: Request, res: Response<Settings | ServerError>) {
    try {
        const config = await db.getBuildConfiguration();

        if (config.data) {
            res.send({
                repoName: config.data.repoName,
                buildCommand: config.data.buildCommand,
                mainBranch: config.data.mainBranch,
                period: config.data.period
            });
        } else {
            return res.status(404).send({ error: 'Build settings has not found' });
        }
    } catch (err) {
        return res.status(404).send({ error: 'Build settings has not found' });
    }
}

export async function setSettings(req: Request<{}, Settings>, res: Response<Settings | ServerError>) {
    const newSettings = {
        repoName: req.body.repoName,
        buildCommand: req.body.buildCommand,
        mainBranch: req.body.mainBranch || 'master',
        period: +req.body.period || 100
    };

    try {
        await git.actualizeLocalRepository(newSettings.repoName);

        await db.setBuildConfiguration(newSettings);

        await getSettings(req, res);
    } catch (err) {
        res.status(500).send({ error: err });
    }
}
