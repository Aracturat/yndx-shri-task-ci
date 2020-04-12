const Git = require('./git');

jest.mock('./utils');
const utils = require('./utils');

let git;

beforeEach(() => {
	jest.resetAllMocks()
	git = new Git();
});


test('getRepositoryUrl should return correct url', () => {
	const repository = 'test';

	const repositoryUrl = git.getRepositoryUrl(repository);

	expect(repositoryUrl).toEqual(`https://github.com/test.git`);
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
