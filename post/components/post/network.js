const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.post('/', insert);
router.put('/', update);
router.get('/:id', detail);

async function list(req, res, next) {
    try {
        const list = await Controller.list();
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
};

async function insert(req, res, next) {
    try {
        const post = await Controller.insert(req.body);
        response.success(req, res, post, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
};

async function update(req, res, next) {
    try {
        const updated = await Controller.update(req.body);
        response.success(req, res, updated, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
};

async function detail(req, res, next) {
    try {
        const post = await Controller.get(req.params.id);
        response.success(req, res, post, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
};


module.exports = router;