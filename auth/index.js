const jwt = require('jsonwebtoken');

function sign(data) {
    return jwt.sign(data, 'mySecr3t');
}

module.exports = {
    sign,
};
