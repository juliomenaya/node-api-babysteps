const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, { id });
    }

    async function insert(body) {
        const user = {
            name: body.name,
            username: body.username,
            id: nanoid()
        }
        await auth.upsert(
            {
                id: user.id,
                username: user.username,
                password: body.password,
            }
        );

        return store.insert(TABLE, user);
    }

    async function update(body) {
        const user = {
            username: body.username,
            name: body.name,
            id: body.id
        }
        await auth.upsert(
            {
                id: user.id,
                username: user.username,
                password: body.password,
            },
            false
        );
        return store.update(TABLE, user);
    }

    function follow(from, to) {
        return store.insert(
            TABLE + '_follow',
            {
                user_from: from,
                user_to: to
            }
        );
    }

    async function following(userId) {
        const join = {};
        join[TABLE] = 'user_to';
        const query = { user_from: userId };
        return await store.query(TABLE + '_follow', query, join);
    }

    async function followers(userId) {
        const join = {};
        join[TABLE] = 'user_from';
        const query = { user_to: userId };
        return await store.query(TABLE + '_follow', query, join);
    }

    return {
        list,
        get,
        insert,
        update,
        follow,
        following,
        followers
    };
};
