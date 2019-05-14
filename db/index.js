const mysql = require('mysql');
const config = require('./config');

module.exports = function(){
    return mysql.createConnection(config);
}
