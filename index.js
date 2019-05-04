const { json, send } = require('micro')
const sendSms = require('./lib/send-sms')
const logger = require('./lib/logger')

async function deliverSms (request, response) {
  const data = await json(request)
  try {
    const result = await sendSms(data)
    logger('info', ['deliverSms', 'sender', data.sender, 'receivers', data.receivers, 'success'])
    send(response, 200, result)
  } catch (error) {
    logger('error', ['deliverSms', 'sender', data.sender, 'receivers', data.receivers, error])
    send(response, 500, error)
  }
}

module.exports = require('./lib/check-token')(deliverSms)
