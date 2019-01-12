'use strict'

const bcrypt = require('bcrypt');
const db = require('../db/db');
const authConfig = require('../../config/authConfig');

const env = process.env.NODE_ENV || 'development';

const auth = {
    getSalt: function(username){
        if (!db.usernameAvailable(username)){
            return 'usernameTaken';
        }
        else {
            return createSalt(); // To hash password on the client side
        }
    },

    registerUser: function(username, password){
        if (!db.usernameAvailable(username)){
            return 'usernameTaken';
        }
        else {
            // Hash again on server side
            // Store in db
            console.log('User registered successfully');
            return 'userRegistered';
        }
    },

    validateUser: function(username, password){
        if (db.usernameAvailable(username)){
            return 'usernameNotFound';
        }
        else {
            if (passwordValid(username, password)){
                // Generate a cookie
                console.log('User logged in successfully');
                return 'userLoggedIn';
            }
            else {
                return 'incorrectPassword';
            }
        }
    }
};

function createSalt(){
    // TODO: Use async functions
    return bcrypt.genSaltSync(authConfig[env].saltRounds); 
}

module.exports = auth