const bcrypt = require('bcrypt');
const auth = require('../../../auth');

const TABLE = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { username: username });
        
        const logged = await bcrypt.compare(password, data.password);

        if (logged) {
            return auth.sign(data);
        } else {
            throw new Error('Invalid information');
        }
    }

    async function upsert(data, inserting = true) {
        const updatedData = {
            id: data.id,
            username: data.username,
            password: await bcrypt.hash(data.password, 5)
        }

        return (
            inserting ?
            store.insert(TABLE, updatedData) : 
            store.update(TABLE, updatedData)
        );
    } 

    return {
        upsert,
        login
    };
};