const Git = require('./git');

jest.mock('./utils');
const utils = require('./utils');

let git;

beforeEach(() => {
	jest.resetAllMocks();
	git = new Git();
});

describe('getRepositoryUrl', () => {
	test('should return correct url', () => {
		const repository = 'test';

		const repositoryUrl = git.getRepositoryUrl(repository);

		expect(repositoryUrl).toEqual(`https://github.com/test.git`);
	});
});

describe('cloneRemoteGithubRepository', () => {
	const repository = 'test';
	const repositoryUrl = 'https://github.com/test.git';

	test('should remove old cloned repository', async () => {
		await git.cloneRemoteGithubRepository(repository);

		expect(utils.removeDirectory).toHaveBeenCalledTimes(1);
		expect(utils.removeDirectory).toHaveBeenCalledWith(git.repositoryTempDirectory);
	});

	test('should run git clone and returns its result on success', async () => {
		const expectedResult = 'clone successful';

		git.commands.cloneRemoteRepository = jest.fn().mockReturnValue(expectedResult);

		const result = await git.cloneRemoteGithubRepository(repository);

		expect(result).toEqual(expectedResult);

		expect(git.commands.cloneRemoteRepository).toHaveBeenCalledTimes(1);
		expect(git.commands.cloneRemoteRepository).toHaveBeenCalledWith(repositoryUrl);
	});
});


describe('getCommitBranch', () => {
	const repository = 'test';
	const commitHash = '123123';
	const mainBranch = 'master';

	beforeEach(() => {
		git.actualizeLocalRepository = jest.fn();
		git.commands.getRemoteBranches = jest.fn();
	});

	test('should actualize local repository', async () => {
		git.commands.getRemoteBranches.mockReturnValueOnce(mainBranch);

		await git.getCommitBranch(repository, commitHash, mainBranch);

		expect(git.actualizeLocalRepository).toHaveBeenCalledTimes(1);
	});

	test('should run correct git command', async () => {
		git.commands.getRemoteBranches.mockReturnValueOnce(mainBranch);

		const result = await git.getCommitBranch(repository, commitHash, mainBranch);

		expect(result).toEqual(mainBranch);

		expect(git.commands.getRemoteBranches).toHaveBeenCalledTimes(1);
		expect(git.commands.getRemoteBranches).toHaveBeenCalledWith(commitHash);
	});

	test('should return mainBranch if have it', async () => {
		git.commands.getRemoteBranches.mockReturnValueOnce(['branch', mainBranch, 'test'].join('\n'));

		const result = await git.getCommitBranch(repository, commitHash, mainBranch);

		expect(result).toEqual(mainBranch);
	});

	test('should return first branch in list if don\'t have mainBranch', async () => {
		git.commands.getRemoteBranches.mockReturnValueOnce(['branch', 'test'].join('\n'));

		const result = await git.getCommitBranch(repository, commitHash, mainBranch);

		expect(result).toEqual('branch');
	});
});

describe('getCommitInfo', () => {
	const repository = 'test';
	const commitHash = '123123';

	beforeEach(() => {
		git.actualizeLocalRepository = jest.fn();
		git.commands.getCommitAuthor = jest.fn();
		git.commands.getCommitMessage = jest.fn();
	});

	test('should actualize local repository', async () => {
		await git.getCommitInfo(repository, commitHash);

		expect(git.actualizeLocalRepository).toHaveBeenCalledTimes(1);
	});

	test('should run correct git command', async () => {
		const author = 'Author';
		const message = 'Message';

		git.commands.getCommitAuthor.mockReturnValue(author);
		git.commands.getCommitMessage.mockReturnValue(message);

		const result = await git.getCommitInfo(repository, commitHash);

		expect(result).toEqual({
			commitHash: commitHash,
			commitAuthor: author,
			commitMessage: message
		});

		expect(git.commands.getCommitAuthor).toHaveBeenCalledTimes(1);
		expect(git.commands.getCommitAuthor).toHaveBeenCalledWith(commitHash);

		expect(git.commands.getCommitMessage).toHaveBeenCalledTimes(1);
		expect(git.commands.getCommitMessage).toHaveBeenCalledWith(commitHash);
	});
});

describe('actualizeLocalRepository', () => {
	const repository = 'test';

	beforeEach(() => {
		git.isGithubRepositoryCloned = jest.fn();
		git.cloneRemoteGithubRepository = jest.fn();
		git.commands.fetchAllBranches = jest.fn();
	});

	test('should clone repository if don\'t have it', async () => {
		git.isGithubRepositoryCloned.mockReturnValue(Promise.resolve(false));

		await git.actualizeLocalRepository(repository);

		expect(git.cloneRemoteGithubRepository).toHaveBeenCalledTimes(1);
		expect(git.cloneRemoteGithubRepository).toHaveBeenCalledWith(repository);
	});

	test('should fetch all branches if have repository', async () => {
		git.isGithubRepositoryCloned.mockReturnValue(Promise.resolve(true));

		await git.actualizeLocalRepository(repository);

		expect(git.commands.fetchAllBranches).toHaveBeenCalledTimes(1);
		expect(git.commands.fetchAllBranches).toHaveBeenCalledWith();
	});
});

describe('isGithubRepositoryCloned', () => {
	const repository = 'test';

	test('should return false if folder doesn\'t exist', async () => {
		utils.isDirectoryExist.mockReturnValue(Promise.resolve(false));

		const result = await git.isGithubRepositoryCloned(repository);

		expect(result).toEqual(false);
	});

	test('should return true if remote origin equals repository url', async () => {
		const repositoryUrl = git.getRepositoryUrl(repository);
		utils.isDirectoryExist.mockReturnValue(Promise.resolve(true));

		git.commands.getRemoteOrigin = jest.fn().mockReturnValue(repositoryUrl);

		const result = await git.isGithubRepositoryCloned(repository);

		expect(result).toEqual(true);

		expect(git.commands.getRemoteOrigin).toHaveBeenCalledTimes(1);
		expect(git.commands.getRemoteOrigin).toHaveBeenCalledWith();
	});
});
