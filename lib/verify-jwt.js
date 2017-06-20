'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const logger = require('./logger')

module.exports = request => {
  return new Promise((resolve, reject) => {
    const bearerToken = request.headers.authorization
    if (bearerToken) {
      const token = bearerToken.replace('Bearer ', '')
      jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
        if (error) {
          logger('error', ['verify-jwt', 'jwt invalid', error])
          resolve({isValid: false, error: JSON.stringify(error)})
        } else {
          logger('info', ['verify-jwt', 'success'])
          resolve({isValid: true})
        }
      })
    } else {
      logger('warn', ['verify-jwt', 'missing token'])
      resolve({isValid: false})
    }
  })
}
