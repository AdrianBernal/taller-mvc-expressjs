var mongoose = require('mongoose');
var logger = require('../utils/logger');

var dbName = '';
var host = 'localhost';
var port = '27017';

var database = {};

database.connect = function () {
    return mongoose.connect(`mongodb://${host}:${port}/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(
            (value) => {
                logger.log('debug','Database connected succesfully');
                return value;
            }
        )
        .catch(
            (error) => {
                logger.log('error', `Error on database connection: mongodb://${host}:${port}/${dbName}` );
                return error;
            }
        );
};

module.exports = database;