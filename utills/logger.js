const {
    createLogger,
    format,
    transports,
    addColors
} = require('winston');
const path = require('path');

const errorLogFilePath = path.join(process.cwd(), 'logs', 'error.log');
const infoLogFilePath = path.join(process.cwd(), 'logs', 'combined.log');

const timestampFormat = format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
});

addColors({
    info: 'cyan',
    error: 'red bold',
    warn: 'yellow',
    debug: 'cyan'
});

const consoleFormat = format.combine(
    timestampFormat,
    format(info => ({
        ...info,
        level: info.level.toUpperCase()
    }))(),
    format.colorize({ all: true }),

    format.printf(({
        level,
        message,
        timestamp
    }) => `${timestamp} | [ ${level} ]: ${message}`)
);

const fileFormat = format.combine(
    format.simple(),
    timestampFormat,
    format.printf(({
        level,
        message,
        timestamp
    }) => {
        const outputMessage = typeof message === 'object' ? JSON.stringify(message) : message;

        return `${timestamp} | [ ${level.toUpperCase()} ]: ${outputMessage}`;
    })
);

const logger = createLogger({
    transports: [
        new transports.File({
            filename: infoLogFilePath,
            format: fileFormat
        }),
        new transports.File({
            filename: errorLogFilePath,
            format: fileFormat,
            level: 'error'
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: consoleFormat }));
}

module.exports = logger;