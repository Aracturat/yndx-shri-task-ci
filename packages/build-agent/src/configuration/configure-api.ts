import express, { Express } from 'express';

import * as api from '../apis/api';

export default function configureApi(app: Express) {
	app.use(express.json());

	app.post('/build', api.build)
	app.get('/is-alive', api.isAlive)
}

