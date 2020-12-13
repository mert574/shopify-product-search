import { createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, printf } = format;

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        format.json(),
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/out.log' }),
    ],
    defaultMeta: {
        service: 'app',
    },
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            colorize(),
            printf(({ level, message, timestamp, service, ...other }) => {
                const otherFields = Object.keys(other).length ? JSON.stringify(other) : '';
                return `\x1b[2m${ timestamp }\x1b[0m ${ level } \x1b[1m[${ service }]\x1b[0m ${ message } ${ otherFields }`;
            }),
        ),
    }));
}

export default logger;
