const db = require('../db-api');

const Settings = require('../models/settings');

async function getSettings(req, res) {
	const config = await db.getBuildConfiguration();

	if (config.data) {
		res.send(new Settings({
			repoName: config.data.repoName,
			buildCommand: config.data.buildCommand,
			mainBranch: config.data.mainBranch,
			period: config.data.period
		}))
	}

	res.send({});
}

async function setSettings(req, res) {
	await db.setBuildConfiguration({
		repoName: req.body.repoName,
		buildCommand: req.body.buildCommand,
		mainBranch: req.body.mainBranch,
		period: req.body.period
	});

	res.end();
}


module.exports = {
	getSettings,
	setSettings
};
