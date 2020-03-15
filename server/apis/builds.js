const db = require('../db-api');
const git = require('../git');

const Build = require('../models/build');
const BuildLog = require('../models/build-log');

async function getBuilds(req, res) {
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
}

async function requestBuild(req, res) {
	const commitHash = req.params.commitHash;

	const { data: { repoName, mainBranch } } = await db.getBuildConfiguration();

	const commitInfo = await git.getCommitInfo(repoName, commitHash);
	const commitBranch = await git.getCommitBranch(repoName, commitHash, mainBranch);

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
}

async function getBuildDetails(req, res) {
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
}

async function getBuildLog(req, res) {
	const buildId = req.params.buildId;

	const logText = await db.getBuildLog({
		buildId: buildId
	});

	res.send(new BuildLog({
		id: buildId,
		text: logText
	}));
}

module.exports = {
	getBuilds,
	requestBuild,
	getBuildDetails,
	getBuildLog
};
