const BUILD_STATUS = {
	Waiting: 0,
	InProgress: 1,
	Success: 2,
	Fail: 3,
	Canceled: 4
};

let configuration = {};
let builds = [];
let buildLogs = [];

function getBuildConfiguration() {
	return Promise.resolve({ data: configuration })
}

function setBuildConfiguration({ repoName, buildCommand, mainBranch, period }) {
	configuration = {
		repoName,
		buildCommand,
		mainBranch,
		period
	};
	builds = [];
	buildLogs = [];

	return Promise.resolve({})
}

function deleteBuildConfiguration() {
	configuration = {};
	builds = [];
	buildLogs = [];

	return Promise.resolve({})
}

let buildNumber = 0;

function requestBuild({ commitMessage, commitHash, branchName, authorName }) {
	buildNumber++;

	const newBuild = {
		id: `guid${buildNumber}`,
		buildNumber: buildNumber,
		commitMessage: commitMessage,
		commitHash: commitHash,
		branchName: branchName,
		authorName: authorName,
		status: BUILD_STATUS.Waiting,
		start: null,
		duration: null
	};

	builds.push(newBuild);
}

function tryGetBuild(buildId) {
	return builds.filter(e => e.id === buildId).shift();
}

function startBuild({ buildId, dateTime }) {
	if (!buildId) {
		throw 'buildId parameter is missing';
	}
	if (!dateTime) {
		dateTime = new Date();
	}

	const build = tryGetBuild(buildId);

	if (!build) {
		return Promise.reject('Build has not found');
	}

	build.start = dateTime.toString();

	return Promise.resolve(build);
}

function finishBuild({ buildId, duration, success, buildLog }) {
	const build = tryGetBuild(buildId);

	if (!build) {
		return Promise.reject('Build has not found');
	}

	build.status = success ? BUILD_STATUS.Success : BUILD_STATUS.Fail;
	build.duration = duration;

	buildLog.push({ id: buildId, text: buildLog });

	return Promise.resolve(build);
}

function cancelBuild({ buildId }) {
	const build = tryGetBuild(buildId);

	if (!build) {
		return Promise.reject('Build has not found');
	}

	build.status = BUILD_STATUS.Canceled;

	return Promise.resolve(build);
}

function getBuildList({ limit = 25, offset = 0 }) {
	const buildSlice = builds.slice(offset, limit + offset + 1);

	return Promise.resolve({ data: buildSlice });
}

function getBuildDetails({ buildId }) {
	const build = tryGetBuild(buildId);

	if (!build) {
		return Promise.reject('Build has not found');
	}

	return Promise.resolve({ data: build });
}

function getBuildLog({ buildId }) {
	const build = tryGetBuild(buildId);

	if (!build) {
		return Promise.reject('Build has not found');
	}

	const buildLog = buildLogs.filter(e => e.id === buildId).shift();

	if (buildLog) {
		return Promise.resolve(buildLog.text);
	}
	else {
		return Promise.resolve('');
	}
}

// Test helpers

function __setConfiguration(newConfiguration) {
	configuration = newConfiguration;
}

function __setBuilds(newBuilds) {
	builds = newBuilds;
}

function __setBuildLogs(newBuildLogs) {
	buildLogs = newBuildLogs
}

function __getConfiguration() {
	return configuration;
}

function __getBuilds() {
	return builds;
}

function __getBuildLogs() {
	return buildLogs;
}



module.exports = {
	getBuildConfiguration: jest.fn().mockImplementation(getBuildConfiguration),
	setBuildConfiguration: jest.fn().mockImplementation(setBuildConfiguration),
	deleteBuildConfiguration: jest.fn().mockImplementation(deleteBuildConfiguration),

	requestBuild: jest.fn().mockImplementation(requestBuild),
	startBuild: jest.fn().mockImplementation(startBuild),
	finishBuild: jest.fn().mockImplementation(finishBuild),
	cancelBuild: jest.fn().mockImplementation(cancelBuild),

	getBuildList: jest.fn().mockImplementation(getBuildList),
	getBuildDetails: jest.fn().mockImplementation(getBuildDetails),
	getBuildLog: jest.fn().mockImplementation(getBuildLog),

	__setConfiguration,
	__setBuilds,
	__setBuildLogs,

	__getConfiguration,
	__getBuilds,
	__getBuildLogs
};
