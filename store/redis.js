const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});


async function get(key) {
    try {
        return await list(key); 
    } catch (error) {
        console.log('El error ', error);
    }
}

async function upsert(table, data) {
    let key = table;
    if (data && data.id) {
        key = key + '_' + data.id;
    }

    client.setex(key, 100, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert
}
