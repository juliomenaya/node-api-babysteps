const dotenv = require('dotenv').config();

const isTruthy = value => {
    if (value === 'TRUE') {
        return true;
    }
    if (value === 'FALSE') {
        return false;
    }
    throw new Error('Could not determine if value is truthy ', value);
}

module.exports = {
    remoteDB: isTruthy(process.env.REMOTE_DB) || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    },
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3001,
    }
};
