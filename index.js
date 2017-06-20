'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { parse } = require('url')
const { json, send } = require('micro')
const verifyJwt = require('./lib/verify-jwt')
const sendSms = require('./lib/send-sms')
const logger = require('./lib/logger')

module.exports = async (request, response) => {
  const { pathname, query } = await parse(request.url, true)

  if (pathname === '/sms') {
    const data = request.method === 'POST' ? await json(request) : query
    const verified = await verifyJwt(request)
    logger('info', ['index', 'sms', 'sender', data.sender, 'receivers', data.receivers, 'start'])
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    if (verified.isValid === true) {
      logger('info', ['index', 'sms', 'sender', data.sender, 'receivers', data.receivers, 'verified'])
      try {
        const result = await sendSms(data)
        logger('info', ['index', 'sms', 'sender', data.sender, 'receivers', data.receivers, 'success'])
        send(response, 200, result)
      } catch (error) {
        logger('error', ['index', 'sms', 'sender', data.sender, 'receivers', data.receivers, error])
        send(response, 500, error)
      }
    } else {
      logger('error', ['index', 'sms', 'sender', data.sender, 'receivers', data.receivers, 'Invalid token'])
      send(response, 401, new Error('Invalid token'))
    }
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
