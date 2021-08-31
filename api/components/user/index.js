const config = require('../../../config');
let store;

if (config === true) {
    store = require('../../../store/remote-mysql');
} else {
    store = require('../../../store/mysql');
}

const crtl = require('./controller'); 

module.exports = crtl(store);
