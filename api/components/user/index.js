const config = require('../../../config');
let store, cache;

if (config === true) {
    store = require('../../../store/remote-mysql');
    cache = require('../../../store/remote-cache');
} else {
    store = require('../../../store/mysql');
    cache = require('../../../store/redis');
}

const crtl = require('./controller'); 

module.exports = crtl(store, cache);
