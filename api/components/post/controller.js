const { nanoid } = require('nanoid');

const TABLE = 'post';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.query(TABLE, { id });
    }

    function insert(body) {
        const post = {
            id: nanoid(),
            user: body.user,
            text: body.text
        };

        return store.insert(TABLE, post);
    }

    function update(body) {
        const updatedPost = {
            id: body.id,
            text: body.text
        };

        return store.update(TABLE, updatedPost);
    }

    return {
        list,
        get,
        insert,
        update
    }
}
