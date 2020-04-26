import { Express } from "express";

import configureApi from './configure-api';
import configureSwagger from './configure-swagger';

export default function configure(app: Express) {
	configureApi(app);
	configureSwagger(app);
}
