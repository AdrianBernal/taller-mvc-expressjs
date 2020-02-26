var winston = require('winston');
var morgan = require('morgan');

var logger = new winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            level: 'error',
            format: winston.format.json(),
            filename: 'logs/error.log',
            handleExceptions: true, //Almacena en el log las excepciones no capturadas.
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.File({
            format: winston.format.json(),
            filename: 'logs/info.log'
        })
    ],
    exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.simple(),
        colorize: true,
        handleExceptions: true,
    }));
}

var stream = function (level) {
    return { // por defecto es process.stdout
        write: function (message, encoding) {
            logger.log(level, message);
        }
    };
};

var infoStream = stream('info');

logger.HTTPLogger = morgan( 'combined',
    //'{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}',
    {
        "stream": infoStream
    });

module.exports = logger;