const sendSms = require('./lib/send-sms')
const logger = require('./lib/logger')

async function deliverSms (request, response) {
  const data = request.body
  try {
    const result = await sendSms(data)
    logger('info', ['deliverSms', 'sender', data.sender, 'receivers', data.receivers, 'success'])
    response.json(result)
  } catch (error) {
    logger('error', ['deliverSms', 'sender', data.sender, 'receivers', data.receivers, error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('./lib/check-token')(deliverSms)
