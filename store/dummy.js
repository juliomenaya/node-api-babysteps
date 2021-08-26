const db = {
    'user': [
        { id: '1', name: 'Julio' }
    ]
};

async function list (tabla) {
    return db[tabla];
}

async function get (tabla, id) {
    let coleccion = await list(tabla);
    return coleccion.filter(item => item.id === id)[0] || null;
}

async function upsert (tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];  // create "table" if not exists
    }

    db[tabla].push(data);
    console.log('La data ', db)
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];

    return col.filter(item => item[key] === q[key])[0] || null;
}

async function remove (tabla, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
};
