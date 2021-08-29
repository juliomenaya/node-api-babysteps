const express = require('express');

const config = require('../config.js');
const post = require('./components/post/network');

const errors = require('../network/error');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routing

app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log('Post service listen in port ', config.post.port);
});
