const { send } = require('micro')
const logger = require('./logger')

module.exports = (error, request, response, next) => {
  if (error.name === 'UnauthorizedError') {
    logger('error', ['handle-unauthorized', error])
    send(response, 401, { error: 'invalid token' })
  }
}
