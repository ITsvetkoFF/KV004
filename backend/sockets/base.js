var jwt          = require('jsonwebtoken'),
    crypto       = require('crypto'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    myConnection = require('express-myconnection'),
    secret = require('../config/secret');

module.exports = function (io) {
    'use strict';
    io.on('connection', function (socket) {
        socket.broadcast.emit('user connected');
        socket.on('message', function (from, msg) {
            jwt.verify(from, secret.secretToken, function (err, decoded) {
                if (err) {
                    console.log("junior Hacker!!!!")
                }
                if (decoded.role != 'administrator') {
                    console.log("senior Hacker!!!!")
                } else {
                    console.log('recieved message from', from, 'msg', JSON.stringify(msg));
                    console.log('broadcasting message');
                    console.log('payload is', msg);
                    io.sockets.emit('broadcast', {
                        payload: msg,
                        source: ""
                    });
                    console.log('broadcast complete');
                }

            });
            socket.on('error', function (err) {
                console.log("Socket.IO Error");
                console.log(err.stack); // this is changed from your code in last comment
            });
        });
    });
}

