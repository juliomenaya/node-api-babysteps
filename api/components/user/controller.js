const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

// function list () {
//     return store.list(TABLA);
// }

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
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

    // async function upsert(body) {
    //     const user = {
    //         name: body.name,
    //         username: body.username,
    //     }

    //     if (body.id) {
    //         user.id = body.id;
    //     } else {
    //         user.id = nanoid();
    //     }

    //     if (body.password || body.username) {
    //         await auth.upsert({
    //             id: user.id,
    //             username: user.username,
    //             password: body.password
    //         });
    //     }

    //     return store.upsert(TABLA, user);
    // }

    return {
        list,
        get,
        insert,
        update,
        follow
    };
};
