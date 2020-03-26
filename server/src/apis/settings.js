const db = require('../db-api');

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
	try {
		await db.setBuildConfiguration({
			repoName: req.body.repoName,
			buildCommand: req.body.buildCommand,
			mainBranch: req.body.mainBranch,
			period: req.body.period
		});

		await getSettings(req, res);
	} catch {
		res.status(500).send({ error: 'Something is going bad'})
	}
}


module.exports = {
	getSettings,
	setSettings
};
