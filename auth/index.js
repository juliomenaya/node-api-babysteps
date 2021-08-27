const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, owner) {
        const tokendecoded = decodeHeader(req);

        if (tokendecoded.id !== owner) {
            throw error('You do not have permission to perform this action', 401);
        }
    },
    logged: function(req, owner) {
        const tokendecoded = decodeHeader(req);

        // if (tokendecoded.id !== owner) {
        //     throw error('You do not have permission to perform this action', 401);
        // }
    }
};


function getToken(auth) {
    if (!auth) {
        throw new Error('Token not provided');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Bearer token format not valid');
    }

    return auth.replace('Bearer ', '');
}


function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check
};
