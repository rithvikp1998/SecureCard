'use strict'

const api = function(io){
    io.on('connection', () => {
        console.log('Connected to io server');
    });
}

module.exports = api;