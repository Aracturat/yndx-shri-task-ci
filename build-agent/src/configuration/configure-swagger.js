const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

function configureSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = configureSwagger;
