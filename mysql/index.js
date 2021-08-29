const express = require('express');

const config = require('../config');
const router = require('./network');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('MYSQL service listen for connections in port ', config.mysqlService.port);
});
