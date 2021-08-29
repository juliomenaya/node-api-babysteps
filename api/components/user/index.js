const store = require('../../../store/remote-mysql');
const crtl = require('./controller'); 

module.exports = crtl(store);
