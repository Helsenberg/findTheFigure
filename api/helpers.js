
const execute = (db, query) => {
    return new Promise((resolve, reject) => {
        db.connect();
        db.query(query, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
        db.end();
    });
}

module.exports.executeQuery = (db, query) => {
    return execute(db, query).then(res => {
        return res;
    }).catch(() => {
        return null;
    })
}
