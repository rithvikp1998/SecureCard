'use strict'

const auth = require('../auth/auth');

const api = function(io){
    io.on('connection', (socket) => {
        console.log('Client with socket id %s connected to io server', socket.id);

        socket.on('getSalt', (data) => {
            console.log('Get salt called for username', data.username);
            auth.getSalt(data.username, (err, salt) => {
                if (err == null) {
                    console.log('Salt generated for ' + data.username + ' : ' + salt);
                    socket.emit('clientSideSalt', {salt: salt});
                }
            });
        });
    });
}

module.exports = api;