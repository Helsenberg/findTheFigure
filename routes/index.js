module.exports = function(app) {
    app.get('/', require('./home').get);
    app.get('/game', require('./game').get);
};
