'use strict'

const dbModuleType = process.env.DATABASE_TYPE || 'mongodb';
const dbModule = require('./' + dbModuleType);

const db = {
    usernameAvailable: function(username, callback){
        dbModule.usernameAvailable(username, (err, result) => {
            callback(err, result);
        });
    },
    fetchPassword: function(username, callback){
        dbModule.fetchPassword(username, (err, result) => {
            callback(err, result);
        });
    },
    addUser: function(username, password, clientSideSalt, serverSideSalt, callback){
        dbModule.addUser(username, password, clientSideSalt, serverSideSalt, (err, result) => {
            callback(err, result);
        });
    }
};

module.exports = db; // TODO: Find better design pattern to separate db 
                    // specific implementations from the interface