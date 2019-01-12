'use strict'

const dbModuleType = process.env.DATABASE_TYPE || 'mongodb';
const dbModule = require('./' + dbModuleType);

const db = {
    usernameAvailable: function(username){
        return dbModule.usernameAvailable(username);
    },
    fetchPassword: function(username){
        return dbModule.fetchPassword(username);
    },
    addUser: function(username){
        return dbModule.addUser(username, password, clientSideSalt, serverSideSalt);
    }
};

module.exports = db; // TODO: Find better design pattern to separate db 
                    // specific implementations from the interface