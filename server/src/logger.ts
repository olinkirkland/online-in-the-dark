import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.align(),
        winston.format.simple(),
        winston.format.printf((info) => {
          const { timestamp, level, message, ...args } = info;
          const localeTimestamp = new Date(timestamp).toLocaleString();
          const normalLog = `${localeTimestamp} ${level}: ${message}`;
          const argsLog = Object.keys(args).length
            ? JSON.stringify(args, null, 2)
            : '';

          return normalLog + (argsLog ? `\n${argsLog}` : '');
        })
      )
    })
  ]
});
