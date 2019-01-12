'use strict'

const mongodb = {
    usernameAvailable: function(username){
        // Check if the username already exists
        return 1;
    },

    fetchPassword: function(username){
        // Get the password that is stored for this username
    },

    addUser: function(username, password, clientSideSalt, serverSideSalt){
        // Store the user's username, double-hashed password and the
        // salts used while hashing the password
    }
};

module.exports = mongodb;