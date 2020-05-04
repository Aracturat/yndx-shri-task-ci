import * as db from '@ci-server/shared/src/db-api';
import { addAgent, stopBuild } from '../agents';
import { Request, Response} from "express";
import { retryIfError } from "@ci-server/shared/src/utils";
import { sendToAll } from "../notifications/send";

export async function notifyAgent(req: Request<{}, {}, { port: number }>, res: Response) {
	const host = req.hostname;
	const port = req.body.port;

	const agent = addAgent({ host, port });

	res.send(agent);
}

export interface NotifyBuildResultRequestBody {
	id: string;
	success: boolean;
	duration: number;
	log: string;
}

export async function notifyBuildResult(req: Request<{}, {}, NotifyBuildResultRequestBody>, res: Response<{}>) {
	const {
		id,
		success,
		duration,
		log
	} = req.body;

	console.log(`Get build result for build ${id}`);

	try {
		console.log(`Send result to DB for build ${id}`);

		await retryIfError(() => db.finishBuild({
				buildId: id,
				buildLog: log,
				duration,
				success
			}),
			5,
			1000
		);

		stopBuild(id);

		await sendToAll('Build status changed', 'Build finished', {
			id,
			status: success ? 'Success' : 'Fail',
			duration
		});

		res.send({});
	} catch (err) {
		console.error(`Error during send result to DB, error: ${err}`);
		res.status(500).send({ error: 'Something is going bad.' });
	}
}
