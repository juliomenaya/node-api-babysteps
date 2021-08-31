const express = require('express');
const config = require('../config.js');

const router = require('./network');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(config.cacheService.port, () => {
    console.log('Cache service listening in port ', config.cacheService.port);
});