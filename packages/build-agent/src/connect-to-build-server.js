const { notifyAgent } = require('./server-api');
const { wait } = require('@ci-server/shared/src/utils');

async function connectToBuildServer() {
	console.log(`Trying to connect to server: ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);

	const port = process.env.PORT;

	for (let i = 0; i < 5; i++) {
		try {
			await notifyAgent({ port });

			console.log(`Successfully connected to server.`);
			return true;
		} catch (err) {
			console.error(`Can't connect to server: ${err}`);
		}

		await wait(5000);
	}

	return false;
}

module.exports = {
	connectToBuildServer
}
