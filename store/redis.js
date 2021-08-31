const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});

function list(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) return reject(err);

            resolve(data ? JSON.parse(data) : null);
        })
    })
}

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
