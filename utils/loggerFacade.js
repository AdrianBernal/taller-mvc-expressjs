var winston = require('winston');
var morgan = require('morgan');

var winstonLogger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: '../logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

var getHTTPLogger = function () {
    return morgan(
        {
            "stream": { // por defecto es process.stdout
                write: function (message, encoding) {
                    logger.info(message);
                }
            }
        });
};

var log = function (level, msg) {
    winstonLogger.log(level, msg);
};

var logger = {
    getHTTPLogger: getHTTPLogger,
    log: log
};

module.exports = logger;