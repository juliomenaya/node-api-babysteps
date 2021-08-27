const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', listUsers);
router.get('/:id/following', following);
router.get('/:id/followers', followers);
router.get('/:id', userDetail);
router.post('/', insert);
router.put('/', secure('update'), update);
router.post('/follow/:id', secure('follow'), follow);


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

async function insert(req, res) {
    try {
        const user = await Controller.insert(req.body);
        response.success(req, res, user, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

async function update(req, res) {
    try {
        const user = await Controller.update(req.body);
        response.success(req, res, user, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

async function follow(req, res, next) {
    try {
        const follow = await Controller.follow(
            req.user.id, req.params.id
        );
        response.success(req, res, follow, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }

}

async function following(req, res, next) {
    try {
        const followings = await Controller.following(req.params.id);
        response.success(req, res, followings, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }

}


async function followers(req, res, next) {
    try {
        const followers = await Controller.followers(req.params.id);
        response.success(req, res, followers, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }

}

module.exports = router;
