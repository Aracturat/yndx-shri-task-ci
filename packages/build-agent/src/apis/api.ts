import { Request, Response } from 'express';
import { runBuild } from '../build-runner';

export interface BuildRequestBody {
    id: string;
    repository: string;
    commitHash: string;
    command: string;
}

export async function build(req: Request<{}, {}, BuildRequestBody>, res: Response<{}>) {
    const {
        id,
        repository,
        commitHash,
        command
    } = req.body;

    console.log(`Get new build request, buildId: ${ id }`);

    setTimeout(() => runBuild({ id, repository, commitHash, command }), 0);

    res.status(200).send({});
}

export async function isAlive(req: Request, res: Response) {
    console.log(`Get new alive request`);

    res.send({});
}
