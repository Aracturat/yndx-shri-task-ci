const { mockResponse, mockRequest } = require('./expess.mock');

const {
	getSettings,
	setSettings
} = require('./settings');

jest.mock('../db-api');
const db = require('../db-api');

const Git = require('../git');
const git = Git.prototype;


function getConfigurationMock() {
	return {
		repoName: 'repo',
		mainBranch: 'test',
		period: 1000,
		buildCommand: 'npm ci'
	};
}

let res;

beforeEach(() => {
	res = mockResponse();
});

describe('getSettings', () => {
	test('should get settings', async () => {
		const req = mockRequest();
		const configuration = getConfigurationMock();

		db.__setConfiguration(configuration);

		await getSettings(req, res);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith(configuration);
	});
});

describe('setSettings', () => {
	const configuration = getConfigurationMock();

	beforeEach(() => {
		git.actualizeLocalRepository = jest.fn();
	});

	test('should set settings', async () => {
		const req = mockRequest({ body: configuration });

		await setSettings(req, res);

		const dbConfiguration = db.__getConfiguration(configuration);

		expect(res.send).toHaveBeenCalledTimes(1);
		expect(res.send).toHaveBeenCalledWith(dbConfiguration);
	});

	test('should actualize repository', async () => {
		const req = mockRequest({ body: configuration });

		await setSettings(req, res);

		expect(git.actualizeLocalRepository).toHaveBeenCalledTimes(1);
		expect(git.actualizeLocalRepository).toHaveBeenCalledWith(configuration.repoName);
	})
});
