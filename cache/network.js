const express = require('express');

const response = require('../network/response');
const Store = require('../store/redis');

const router = express.Router();

router.get('/:key', get);
router.post('/:key', upsert);


async function get(req, res, next) {
    try {

        const data = await Store.get(req.params.key);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Value does not exists', 404);
    }
}

async function upsert(req, res, next) {
    const data = await Store.upsert(req.params.key, req.body);
    response.success(req, res, data, 200);
}


module.exports = router;
