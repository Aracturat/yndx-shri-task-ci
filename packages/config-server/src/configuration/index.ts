import configureApi from './configure-api';
import configureSwagger from './configure-swagger';
import { Express } from "express";

export default function configure(app: Express) {
	configureApi(app);
	configureSwagger(app);
}
