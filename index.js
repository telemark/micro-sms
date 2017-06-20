'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { parse } = require('url')
const { json, send } = require('micro')
const verifyJwt = require('./lib/verify-jwt')
const sendSms = require('./lib/send-sms')

module.exports = async (request, response) => {
  const { pathname, query } = await parse(request.url, true)

  if (pathname === '/sms') {
    const data = request.method === 'POST' ? await json(request) : query
    const verified = await verifyJwt(request)
    if (verified.isValid === true) {
      try {
        const result = await sendSms(data)
        send(response, 200, result)
      } catch (error) {
        send(response, 500, error)
      }
    } else {
      send(response, 401, new Error('Invalid token'))
    }
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
