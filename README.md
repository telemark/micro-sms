[![Build Status](https://travis-ci.org/telemark/micro-sms.svg?branch=master)](https://travis-ci.org/telemark/micro-sms)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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

## Development

Requires the [ZEIT/Now](https://zeit.co/now) cli

```
$ npm run dev
```

## Deploy to ZEIT/Now - Manual

Setup [now.json](now.json) for your environment.

Run the deploy script.

```
$ npm run deploy
```

## Deploy to ZEIT/Now - Automatic

Configure GitHub action for your environment.

Do a release.

## License

[MIT](LICENSE)