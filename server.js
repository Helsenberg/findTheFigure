const express = require('express');
//const io = require('socket.io')(http);
const config = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const port = config.get('port');
const server = express();
const db = require('./db')();
require('./api')(server);
require('./routes')(server);

server.engine('ejs', require('ejs-locals'));
server.set('views', __dirname + '/template');
server.set('view engine', 'ejs');
server.use(server.router);
server.use(bodyParser());
server.use(cookieParser());
server.set('trust proxy', 1);
server.use(expressSession({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie')
}));

server.use(express.static('public'));

server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`);
});

db.end();

/*MongoClient.connect('mongodb://localhost:27017/server', function(err, database){
    if(err){
        return console.log(err);
    }
    db = database;

    const score = 0;

    io.on('connection', function (socket) {

        io.emit('hi', 'everyone');
        io.emit('setScore', score);

        socket.on('chanelfixer', function(chanel){
            socket.join(chanel, function () {
                console.log("now in rooms ", socket.rooms);
            });
            //console.log(io.sockets.adapter.rooms[chanel]);
            //console.log(socket.rooms);
        });

        socket.on('message', function(msg){
            io.to('red').emit('message',msg);
        });

        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
            score++;
            io.emit('setScore', score);
            io.emit('chat message', msg);
        });

        console.log('%s: %s - connected', socket.id.toString(), socket.handshake.address);

        socket.on('disconnect', function () {
            console.log('%s: %s - disconnect', socket.id.toString(), socket.handshake.address);
        });

    });

});*/
