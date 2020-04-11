const db = require('../db-api');
const git = require('../git');

const Settings = require('../models/settings');

async function getSettings(req, res) {
	try {
		const config = await db.getBuildConfiguration();

		if (config.data) {
			res.send(new Settings({
				repoName: config.data.repoName,
				buildCommand: config.data.buildCommand,
				mainBranch: config.data.mainBranch,
				period: config.data.period
			}))
		} else {
			res.send({});
		}
	} catch (err) {
		return res.status(404).send({ error: 'Build settings has not found' });
	}


}

async function setSettings(req, res) {
	const newSettings = {
		repoName: req.body.repoName,
		buildCommand: req.body.buildCommand,
		mainBranch: req.body.mainBranch || 'master',
		period: +req.body.period || 100
	};

	try {
		await git.actualizeLocalRepository(newSettings.repoName)

		await db.setBuildConfiguration(newSettings);

		await getSettings(req, res);
	} catch (err) {
		res.status(500).send({ error: err })
	}
}


module.exports = {
	getSettings,
	setSettings
};
