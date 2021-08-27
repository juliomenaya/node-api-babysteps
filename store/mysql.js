const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection;

function handleConn() {
    connection = mysql.createConnection(dbconf);
    connection.connect(err => {
        if (err) {
            console.error('[db error] ', err);
            setTimeout(handleConn, 2000); // try again in 2 seconds
        } else {
            console.log('DB connected');
        }
    });

    connection.on('error', err => {
        console.error('[db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConn();
        } else {
            throw err;
        }
    });
}

handleConn();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    });
}


function get(table, _query) {
    return new Promise(async (resolve, reject) => {
        try {
            const querySet = await query(table, _query);
            resolve(querySet[0]);
        }
        catch (err) {
            reject(err);
        }
    });
}


function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE ${table} SET ? WHERE id=?`,
            [data, data.id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            }
        );
    });
}


function query(table, query, join) {
    let joinQuery = '';

    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            const querySet = res.map(row => ({ ...row }));
            resolve(querySet || null);
        });
    });
}

module.exports = {
    list,
    get,
    insert,
    update,
    query
}
