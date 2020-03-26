const express = require('express');
const cors = require('cors')

const settingsApi = require('../apis/settings');
const buildsApi = require('../apis/builds');

function configureApi(app) {
	app.use(cors());
	app.use(express.json());

	app.get('/api/settings', settingsApi.getSettings);
	app.post('/api/settings', settingsApi.setSettings);

	app.get('/api/builds', buildsApi.getBuilds);
	app.post('/api/builds/:commitHash', buildsApi.requestBuild);
	app.get('/api/builds/:buildId', buildsApi.getBuildDetails);
	app.get('/api/builds/:buildId/logs', buildsApi.getBuildLog);
}

module.exports = configureApi;
