'use strict'

const mongoClient = require('mongodb').MongoClient;
const config = require('../../config/config');
const env = process.env.NODE_ENV || 'development';
var db = null;
var usersCollection = null;

var mongoUrl = 'mongodb://' + config.database[env].hostname + ':' + config.database[env].port;

mongoClient.connect(mongoUrl, function(err, client) {
    if (err == null){
        console.log("Connected successfully to MongoDB server");
        db = client.db(config.database[env].dbName);
        usersCollection = db.collection('users');
    }
});

// TODO: Make these functions available only after db is connected
const mongodb = {
    usernameAvailable: function(username, callback){
        usersCollection.find({username: username}).toArray((err, result) => {
            if(err == null){
                if(result.length == 0){
                    console.log('Username %s available', username);
                    callback(null, 1);
                }
                else {
                    console.log('Username %s already taken', username);
                    callback(null, 0);
                }
            }
        });
    },

    fetchSalt: function(username, callback){
        usersCollection.find({username: username}).toArray((err, result) => {
            if(err == null && result.length == 1){
                callback(null, result[0].clientSideSalt);
            }
        });
    },

    fetchPassword: function(username, callback){
        usersCollection.find({username: username}).toArray((err, result) => {
            if(err == null && result.length == 1){
                callback(null, result[0].password);
            }
        });
    },

    registerUser: function(username, password, clientSideSalt, serverSideSalt, callback){
        usersCollection.insert({
            username: username,
            password: password,
            clientSideSalt: clientSideSalt,
            serverSideSalt: serverSideSalt}, (err, result) => {
                if(err == null && result.result.n == 1){
                    console.log('User data written to db');
                    callback(null);
                }
            })
    }
};

module.exports = mongodb;