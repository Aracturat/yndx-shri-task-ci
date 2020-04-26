import './src/read-config';

import express from 'express';

import configure from './src/configuration';
import { connectToBuildServer } from './src/connect-to-build-server';

const app = express();
configure(app);

const port = process.env.PORT;
const server = app.listen(port, async function () {
	console.log(`School CI Build Agent is listening on port ${port}.`);

	const isConnected = await connectToBuildServer();
	if (!isConnected) {
		console.error(`Shutdown agent...`);
		server.close();
	}
});
