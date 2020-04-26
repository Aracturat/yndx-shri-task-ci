import axios from 'axios';
import { HostPort } from "./models/host-port";

export interface BuildRequestBody {
	id: string;
	repository: string;
	commitHash: string;
	command: string;
}

/**
 * Run build.
 */
export function build({ host, port}: HostPort, { id, repository, commitHash, command }: BuildRequestBody ) {
	return axios.post(`http://${host}:${port}/build`, {
		id,
		repository,
		commitHash,
		command
	});
}

/**
 * Check is agent alive.
 */
export function isAlive({ host, port}: HostPort) {
	return axios.get(`http://${host}:${port}/is-alive`)
		.then(() => true)
		.catch(() => false);
}
