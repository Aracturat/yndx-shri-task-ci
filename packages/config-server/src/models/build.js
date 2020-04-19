class Build {
	/**
	 * @param {String} id
	 * @param {Number} buildNumber
	 * @param {String} commitMessage
	 * @param {String} commitHash
	 * @param {String} branchName
	 * @param {String} authorName
	 * @param {String} status
	 * @param {Date} start
	 * @param {Number} duration
	 */
	constructor(
		{
			id,
			buildNumber,
			commitMessage,
			commitHash,
			branchName,
			authorName,
			status,
			start,
			duration
		}
	) {
		this.id = id;
		this.buildNumber = buildNumber;
		this.commitMessage = commitMessage;
		this.commitHash = commitHash;
		this.branchName = branchName;
		this.authorName = authorName;
		this.status = status;
		this.start = start;
		this.duration = duration;
	}
}

module.exports = Build;
