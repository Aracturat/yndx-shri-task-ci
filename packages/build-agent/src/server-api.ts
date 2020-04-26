import axios from 'axios';

const instance = axios.create({
	baseURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`
});

/**
 * Notify build server about new agent.
 */
export function notifyAgent({ port }: { port: number }) {
	return instance.post('/notify-agent', {
		port
	});
}

interface NotifyBuildResult {
	id: string;
	success: boolean;
	duration: number;
	log: string;
}

/**
 * Notify build server about build result.
 */
export function notifyBuildResult({ id, success, duration, log }: NotifyBuildResult) {
	return instance.post('/notify-build-result', {
		id,
		success,
		duration,
		log
	});
}
