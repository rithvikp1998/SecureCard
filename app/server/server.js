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
                    socket.emit('clientSideSalt', {username: data.username, salt: salt});
                }
            });
        });

        socket.on('registerUser', (data) => {
            console.log('Registering user %s with client-side salt %s and password hash %s',
            data.username, data.salt, data.hash);
            auth.registerUser(data.username, data.hash, data.salt, (err) => {
                if (err == null){
                    console.log("User '%s' registered successfully", data.username);
                    // Redirect user
                }
            });
        });
    });
}

module.exports = api;