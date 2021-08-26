const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const list = await Controller.list();
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

// router.get('/gatitos', function (req, res) {
//     res.send('Aqui estan los michis')
// })

module.exports = router;

// router.get('/perritos', function (req, res) {
//     res.send('Aqui están los perritos')
// });

