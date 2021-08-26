const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const config = require('../config.js');
const user = require('./components/user/network');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routing

app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () => {
    console.log('Api listen in port ', config.api.port);
});