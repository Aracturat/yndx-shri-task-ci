import { Express } from "express";

import swaggerUi from 'swagger-ui-express';

const swaggerDocument = require('./swagger.json');

export default function configureSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

