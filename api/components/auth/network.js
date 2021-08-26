const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', login);

async function login(req, res) {
    try {
        let token = await Controller.login(req.body.username, req.body.password);
        response.success(req, res, { token }, 200);
    } catch (error) {
        response.error(req, res, 'Access denied', 400);
    }
    

}

module.exports = router;