[![Build Status](https://travis-ci.org/telemark/micro-sms.svg?branch=master)](https://travis-ci.org/telemark/micro-sms)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/micro-sms.svg)](https://greenkeeper.io/)

# micro-sms

Microservice for sending sms

## API

All calls must supply a valid jwt

### ```POST /sms```

Send sms

```JavaScript
{
  sender: '<name-or-number>',
  receivers: ['number1', 'number2'],
  message: '<message>',
  operation: 9 // Optional
}
```

```bash
$ curl -v -H "Authorization: <INSERT TOKEN>" -d '{ "sender": "A Book", "receivers": ["+4798765432"], "message": "Do you read me?" }' https://sms.service.io/sms
```

## License

[MIT](LICENSE)

![Robohash image of micro-sms](https://robots.kebabstudios.party/micro-sms.png "Robohash image of micro-sms")