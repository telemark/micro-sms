const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { json, send } = require('micro')
const sendSms = require('./send-sms')
const logger = require('./logger')

exports.getFrontpage = async (request, response) => {
  logger('info', ['handler', 'frontpage'])
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.deliverSms = async (request, response) => {
  const data = await json(request)
  try {
    const result = await sendSms(data)
    logger('info', ['handler', 'sendSms', 'sender', data.sender, 'receivers', data.receivers, 'success'])
    send(response, 200, result)
  } catch (error) {
    logger('error', ['handler', 'sendSms', 'sender', data.sender, 'receivers', data.receivers, error])
    send(response, 500, error)
  }
}
