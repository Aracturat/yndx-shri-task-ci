const express = require('express');

const api = require('../apis/api');

function configureApi(app) {
	app.use(express.json());

	app.post('/notify-agent', api.notifyAgent);
	app.post('/notify-build-result', api.notifyBuildResult);
}

module.exports = configureApi;
