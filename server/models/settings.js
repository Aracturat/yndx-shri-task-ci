class Settings {
	/**
	 * @param {String} repoName
	 * @param {String} buildCommand
	 * @param {String} mainBranch
	 * @param {Number} period
	 */
	constructor({ repoName, buildCommand, mainBranch, period }) {
		this.repoName = repoName;
		this.buildCommand = buildCommand;
		this.mainBranch = mainBranch;
		this.period = period;
	}
}

module.exports = Settings;

