const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', listUsers);
router.get('/:id', userDetail);
router.post('/', upsert);
router.put('/', secure('update'), upsert);


async function listUsers(req, res) {
    try {
        const list = await Controller.list();
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
};

async function userDetail(req, res) {
    try {
        const user = await Controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
};

async function upsert(req, res) {
    try {
        const user = await Controller.upsert(req.body);
        response.success(req, res, user, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

module.exports = router;
