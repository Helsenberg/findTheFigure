const {executeQuery} = require('../helpers');

module.exports.getUsers = async (db) => {
    return await executeQuery(db, 'SELECT name, surname FROM users');
}

module.exports.getUserById = async (db, id) => {
    return executeQuery(db, `SELECT * FROM users WHERE id=${id}`).then(res => {
        if(res.length){
            return res[0];
        }
    });
}
