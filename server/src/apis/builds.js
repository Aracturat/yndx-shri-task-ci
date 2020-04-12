const path = require('path');

const db = require('../db-api');
const Git = require('../git');
const git = new Git();

const Build = require('../models/build');
const BuildLog = require('../models/build-log');
const FileCache = require('../file-cache');

async function getBuilds(req, res) {
	try {
		const buildList = await db.getBuildList({
			limit: req.query.limit,
			offset: req.query.offset
		});

		res.send(buildList.data.map(build => new Build({
			id: build.id,
			buildNumber: build.buildNumber,
			commitMessage: build.commitMessage,
			commitHash: build.commitHash,
			branchName: build.branchName,
			authorName: build.authorName,
			status: build.status,
			start: build.start,
			duration: build.duration
		})));
	} catch (err) {
		res.status(500).send({ error: 'Something is going bad. Maybe build settings is missing.' });
	}
}

async function requestBuild(req, res) {
	const commitHash = req.params.commitHash;

	if (!commitHash) {
		return res.status(500).send({ error: 'Commit hash parameter is required' });
	}

	let repoName = null;
	let mainBranch = null;

	try {
		const config = await db.getBuildConfiguration();

		if (config.data) {
			repoName = config.data.repoName;
			mainBranch = config.data.mainBranch;
		}

		if (!repoName || !mainBranch) {
			throw 'wrong settings';
		}
	} catch (err) {
		return res.status(404).send({ error: 'Build settings has not found' });
	}

	let commitInfo = null;
	let commitBranch = null;

	try {
		commitInfo = await git.getCommitInfo(repoName, commitHash);
		commitBranch = await git.getCommitBranch(repoName, commitHash, mainBranch);

		if (!commitInfo) {
			throw 'Missing commit info';
		}

		if (!commitBranch) {
			throw 'Missing commit branch';
		}
	} catch (err) {
		return res.status(500).send({ error: `Git error: ${err}` });
	}

	try {
		await db.requestBuild({
			commitMessage: commitInfo.commitMessage,
			commitHash: commitInfo.commitHash,
			authorName: commitInfo.commitAuthor,
			branchName: commitBranch
		});

		const newBuild = await db.getBuildList({ limit: 1 }).then(res => res.data[0]);

		res.send(new Build({
			id: newBuild.id,
			buildNumber: newBuild.buildNumber,
			commitMessage: newBuild.commitMessage,
			commitHash: newBuild.commitHash,
			branchName: newBuild.branchName,
			authorName: newBuild.authorName,
			status: newBuild.status,
			start: newBuild.start,
			duration: newBuild.duration
		}));
	} catch (err) {
		res.status(500).send({ error: 'Something is going bad' });
	}
}

async function getBuildDetails(req, res) {
	try {
		const build = await db.getBuildDetails({
			buildId: req.params.buildId
		});

		res.send(new Build({
			id: build.data.id,
			buildNumber: build.data.buildNumber,
			commitMessage: build.data.commitMessage,
			commitHash: build.data.commitHash,
			branchName: build.data.branchName,
			authorName: build.data.authorName,
			status: build.data.status,
			start: build.data.start,
			duration: build.data.duration
		}));
	} catch (err) {
		return res.status(404).send({ error: 'Build has not found' });
	}
}

const buildLogCache = new FileCache(path.join(__dirname, '../___TEMP___/log-cache'));

async function getBuildLog(req, res) {
	const buildId = req.params.buildId;

	try {
		let logText;

		if (await buildLogCache.has(buildId)) {
			logText = await buildLogCache.get(buildId);
		} else {
			logText = await db.getBuildLog({
				buildId: buildId
			});

			if (logText) {
				await buildLogCache.add(buildId, logText);
			}
		}

		res.send(new BuildLog({
			id: buildId,
			text: logText
		}));
	} catch (err) {
		return res.status(404).send({ error: 'Build has not found' });
	}
}

module.exports = {
	getBuilds,
	requestBuild,
	getBuildDetails,
	getBuildLog
};
