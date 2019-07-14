const sendSms = require('pswincom-gateway').sendSms
const logger = require('./logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const setup = {
      user: process.env.SMS_USERNAME,
      password: process.env.SMS_PASSWORD,
      sender: data.sender,
      receivers: data.receivers,
      message: data.message,
      done: handleResult,
      error: handleError
    }

    if (data.operation) {
      setup.operation = parseInt(data.operation, 10)
    }

    function handleResult (result) {
      logger('info', ['send-sms', 'sender', data.sender, 'receivers', data.receivers, 'success'])
      resolve(result)
    }

    function handleError (error) {
      logger('error', ['send-sms', 'sender', data.sender, 'receivers', data.receivers, error])
      reject(error)
    }

    sendSms(setup)
  })
}
