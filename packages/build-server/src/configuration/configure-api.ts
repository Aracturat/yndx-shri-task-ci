import express, { Express } from 'express';

import * as api from '../apis/api';

export default function configureApi(app: Express) {
	app.use(express.json());


	app.post('/notify-agent', api.notifyAgent);
	app.post('/notify-build-result', api.notifyBuildResult);
}

