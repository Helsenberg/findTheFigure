var express = require('express');
var http = require('http');
//var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var config = require('config');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var errorhandler = require('errorhandler');
var mongoose = require('lib/mongoose');

var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');
app.use(errorhandler());

app.use(app.router);
app.use(bodyParser());

var MongoStore = require('connect-mongo')(expressSession);

app.set('trust proxy', 1) // trust first proxy
app.use(cookieParser());
app.use(expressSession({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
    if(app.get('env') == 'development'){
        var errorHandler = errorhandler();
        errorHandler(err, req, res, next);
    }
    else{
        res.send(500);
    }
})

http.createServer(app).listen(config.get('port'), function(){
    console.log('listening on *:' + config.get('port'));
});


/*app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/game.html', function(req, res){
    res.sendFile(__dirname + '/game.html');
});

app.get('/js/point.min.js', function(req, res){
    res.sendFile(__dirname + '/js/point.min.js');
});

app.get('/js/init.js', function(req, res){
    res.sendFile(__dirname + '/js/init.js');
});

app.get('/js/menu.js', function(req, res){
    res.sendFile(__dirname + '/js/menu.js');
});

app.get('/js/game.js', function(req, res){
    res.sendFile(__dirname + '/js/game.js');
});


app.get('/images/back.jpg', function(req, res){
    res.sendFile(__dirname + '/images/back.jpg');
});*/


//var db;

/*MongoClient.connect('mongodb://localhost:27017/app', function(err, database){
    if(err){
        return console.log(err);
    }
    db = database;

    var score = 0;

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
