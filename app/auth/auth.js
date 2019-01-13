'use strict'

const bcrypt = require('bcrypt');
const db = require('../db/db');
const authConfig = require('../../config/authConfig');

const env = process.env.NODE_ENV || 'development';

const auth = {
    getSalt: function(username, callback){
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

    registerUser: function(username, password, callback){
        db.usernameAvailable(username, (err, result) => {
            if (err == null && result == 1){
                // Hash again on server side
                // Store in db
                console.log('User registered successfully');
                callback(null, 'userRegistered');
            }
        });
    },

    validateUser: function(username, password, callback){
        db.usernameAvailable(username, (err, result) => {
            if (err == null && result == 1){
                passwordValid(username, password, (err, result) => {
                    // Generate a cookie
                    console.log('User logged in successfully');
                    callback(null, 'userLoggedIn');
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

module.exports = auth