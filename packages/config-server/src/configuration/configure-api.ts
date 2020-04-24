import { Express } from "express";

import express from 'express';
import cors from 'cors';

import * as settingsApi from '../apis/settings';
import * as buildsApi from '../apis/builds';

export default function configureApi(app: Express) {
	app.use(cors());
	app.use(express.json());

	app.get('/api/settings', settingsApi.getSettings);
	app.post('/api/settings', settingsApi.setSettings);

	app.get('/api/builds', buildsApi.getBuilds);
	app.post('/api/builds/:commitHash', buildsApi.requestBuild);
	app.get('/api/builds/:buildId', buildsApi.getBuildDetails);
	app.get('/api/builds/:buildId/logs', buildsApi.getBuildLog);
}

