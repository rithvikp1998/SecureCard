'use strict'

const bcrypt = require('bcrypt');
const db = require('../db/db');
const authConfig = require('../../config/authConfig');

const env = process.env.NODE_ENV || 'development';

const auth = {
    generateNewSalt: function(username, callback){
        db.usernameAvailable(username, (err, result) => {
            if (err == null && result == 1){
                createSalt((err, salt) => {
                    if (err == null) {
                        callback(null, salt);
                    }
                })
            }
        });
    },

    registerUser: function(username, password, clientSideSalt, callback){
        db.usernameAvailable(username, (err, result) => {
            if (err == null && result == 1){
                hashPassword(password, (err, hash, serverSidesalt) => {
                    if(err == null){
                        db.registerUser(username, hash, clientSideSalt, serverSidesalt, (err) => {
                            if (err == null){
                                console.log("User '%s' registration data written to db", username);
                                callback(null);
                            }
                        });
                    }
                });
            }
        });
    },

    getSalt: function(username, callback){
        db.fetchSalt(username, (err, result) => {
            if(err == null){
                callback(null, result);
            }
        });
    },

    validateUser: function(username, password, callback){
        db.usernameAvailable(username, (err, result) => {
            result = 0; // Until db methods are implemented
            if (err == null && result == 0){
                passwordValid(username, password, (err, result) => {
                    if(err == null && result == 1){
                        // Generate a cookie
                        console.log('User logged in successfully');
                        callback(null, 1);
                    }
                });
            }
        });
    }
};

function createSalt(callback){
    bcrypt.genSalt(authConfig[env].saltRounds, (err, salt) => {
        if (err == null) {
            callback(null, salt);
        }
    }); 
}

function hashPassword(password, callback){
    bcrypt.genSalt(authConfig[env].saltRounds, function(err, salt) {
        if (err == null){
            bcrypt.hash(password, salt, function(err, hash) {
                if (err == null){
                    callback(null, hash, salt);
                }
            });
        }
    });
}

function passwordValid(username, password, callback){
    db.fetchPassword(username, (err, result) => {
        bcrypt.compare(password, result, (err, same) => {
            if(err == null && same == 1){
                callback(null, 1);
            }
            callback(null, 1); // Until db methods are implemented
        });
    })
}

module.exports = auth