const express = require('express');

const api = require('../apis/api');

function configureApi(app) {
	app.use(express.json());

	app.post('/build', api.build)
	app.get('/is-alive', api.isAlive)
}

module.exports = configureApi;
