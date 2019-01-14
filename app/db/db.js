'use strict'

const dbModuleType = process.env.DATABASE_TYPE || 'mongodb';
const dbModule = require('./' + dbModuleType);

const db = {
    usernameAvailable: function(username, callback){
        dbModule.usernameAvailable(username, (err, result) => {
            callback(err, result);
        });
    },
    fetchSalt: function(username, callback){
        dbModule.fetchSalt(username, (err, result) => {
            callback(err, result);
        })
    },
    fetchPassword: function(username, callback){
        dbModule.fetchPassword(username, (err, result) => {
            callback(err, result);
        });
    },
    registerUser: function(username, password, clientSideSalt, serverSideSalt, callback){
        dbModule.registerUser(username, password, clientSideSalt, serverSideSalt, (err) => {
            callback(err);
        });
    }
};

module.exports = db; // TODO: Find better design pattern to separate db 
                    // specific implementations from the interface