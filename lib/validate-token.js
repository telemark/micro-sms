const jwt = require('jsonwebtoken')
const logger = require('./logger')

module.exports = async token => {
  logger('info', ['validate-machine-token', 'start'])
  let verifiedToken
  try {
    verifiedToken = process.env.JWT_SECRET ? jwt.verify(token, process.env.JWT_SECRET) : true
  } catch (error) {
    throw error
  }
  logger('info', ['validate-machine-token', 'success'])
  return verifiedToken
}
