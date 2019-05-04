const winston = require('winston')
require('winston-papertrail').Papertrail // eslint-disable-line no-unused-expressions
const { name, version } = require('../package.json')

function getPapertrail () {
  return process.env.NODE_ENV !== 'production' ? {} : new winston.transports.Papertrail({
    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT,
    hostname: process.env.PAPERTRAIL_HOSTNAME,
    logFormat: (level, message) => `${level.toUpperCase()} - ${message || ''}`
  })
}

const winstonPapertrail = getPapertrail()

const winstonConsole = new winston.transports.Console({
  formatter: options => `${new Date().toUTCString()} - ${options.level.toUpperCase()} - ${(options.message ? options.message : '')}`
})

const winstonTransports = process.env.NODE_ENV !== 'production' ? [winstonConsole] : [winstonConsole, winstonPapertrail]

const logger = new (winston.Logger)({
  transports: winstonTransports
})

module.exports = (level, message) => {
  const data = Array.isArray(message) ? message : [message]
  const logMessage = `${name} - ${version}: ${data.join(' - ')}`
  return logger.log(level, logMessage)
}
