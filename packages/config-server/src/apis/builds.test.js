const { mockResponse, mockRequest } = require('./expess.mock');

const {
	getBuilds,
	requestBuild,
	getBuildDetails,
	getBuildLog
} = require('./builds');

jest.mock('@ci-server/shared/src/db-api');
const db = require('@ci-server/shared/src/db-api');

jest.mock('@ci-server/shared/src/file-cache');

jest.mock('@ci-server/shared/src/git');
const Git = require('@ci-server/shared/src/git');
const git = Git.prototype;

let res;


function getBuildMock() {
	return {
		'id': 'guid0',
		'buildNumber': 0,
		'commitMessage': 'string',
		'commitHash': 'string',
		'branchName': 'string',
		'authorName': 'string',
		'status': 'Waiting',
		'start': '2020-04-12T08:45:45.826Z',
		'duration': 0
	}
}

function getConfigurationMock() {
	return {
		repoName: 'repo',
		mainBranch: 'test'
	}
}

beforeEach(() => {
	res = mockResponse();
});

describe('getBuilds', () => {
	test('should get build list with default params', async () => {
		const build = getBuildMock();

		db.__setBuilds([ build ]);

		const req = mockRequest({ query: {} });

		await getBuilds(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith([ build ]);
	});

	test('should return error if db API has error', async () => {
		const req = mockRequest({ query: {} });

		const dbGetBuildList = db.getBuildList.getMockImplementation();
		db.getBuildList.mockImplementation(() => { throw 'Error'; });

		await getBuilds(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith({ error: 'Something is going bad. Maybe build settings is missing.' });

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500)

		db.getBuildList.mockImplementation(dbGetBuildList);
	})
});

describe('requestBuild', () => {
	const configuration = getConfigurationMock();
	const commitInfo = {
		commitHash: '123123',
		commitMessage: 'Test message',
		commitAuthor: 'Test author'
	};
	const commitBranch = 'Test branch';

	test('should return error if commitHash is missing', async () => {
		const req = mockRequest({ params: { } });

		await requestBuild(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith({ error: 'Commit hash parameter is required' });

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500)
	});

	test('should request build', async () => {
		const req = mockRequest({ params: { commitHash: commitInfo.commitHash } });

		db.__setConfiguration(configuration);
		db.__setBuilds([]);

		git.getCommitInfo.mockReturnValue(commitInfo);
		git.getCommitBranch.mockReturnValue(commitBranch);

		await requestBuild(req, res);

		const dbValue = db.__getBuilds()[0];

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith(dbValue);
	})
});

describe('getBuildDetails', () => {
	const build = getBuildMock();

	beforeEach(() => {
		db.__setBuilds([ build ]);
	});

	test('should return build details for correct buildId', async () => {
		const req = mockRequest({ params: { buildId: build.id }});

		await getBuildDetails(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith(build);
	});

	test('should return error for incorrect buildId', async () => {
		const req = mockRequest({ params: { buildId: build.id + 1 }});

		await getBuildDetails(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith({ error: 'Build has not found' });

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404)
	});
});

describe('getBuildLog', () => {
	const build = getBuildMock();
	const logText = 'log';

	beforeEach(() => {
		db.__setBuilds([ build ]);
		db.__setBuildLogs([{ id: build.id, text: logText}]);
	});

	test('should return build logs for correct buildId', async () => {
		const req = mockRequest({ params: { buildId: build.id }});

		await getBuildLog(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith({ id: build.id, text: logText });
	});

	test('should return error for incorrect buildId', async () => {
		const req = mockRequest({ params: { buildId: build.id + 1 }});

		await getBuildLog(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith({ error: 'Build has not found' });

		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404)
	});
});
