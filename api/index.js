const config = require('../config');
const db = require('../db')();

module.exports = function(app){
    require('./users')(app, db, config.apiBaseUrl);
    require('./session')(app, config.apiBaseUrl);
}
