const {getUserId} = require('./helpers');
const {getResponse} = require('../../helpers');

module.exports = (app, apiBaseUrl) => {
    app.get(`${apiBaseUrl}/session/userId`, async (req, res) => {
        const id = await getUserId();
        res.send(getResponse(id, 0));
    });
}
