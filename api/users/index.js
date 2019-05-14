
const {getResponse} = require('../../helpers');
const {getUsers, getUserById} = require('./helpers');

module.exports = (app, db, apiBaseUrl) => {
    app.get(`${apiBaseUrl}/users/`, async (req, res) => {
        const users = await getUsers(db);
        res.send(getResponse(users, 0));
    });

    // app.post(`${apiBaseUrl}/users/`, async (req, res) => {
    //     console.log(req.params);
    //     res.send();
    // });

    app.get(`${apiBaseUrl}/users/:id`, async (req, res) => {
        if(req.params.id){
            const user = await getUserById(db, req.params.id);
            res.send(getResponse(user, 0));
            return;
        }
        res.send(getResponse(null, 0));
    });
}
