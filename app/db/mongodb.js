'use strict'

const mongodb = {
    usernameAvailable: function(username, callback){
        // Check if the username already exists
        callback(null, 1);
    },

    fetchSalt: function(username, callback){
        // Get the clientSide salt for the username
        callback(null, 'someSalt');
    },

    fetchPassword: function(username, callback){
        // Get the password that is stored for this username
        callback(null, null);
    },

    registerUser: function(username, password, clientSideSalt, serverSideSalt, callback){
        // Store the user's username, double-hashed password and the
        // salts used while hashing the password
        callback(null);
    }
};

module.exports = mongodb;