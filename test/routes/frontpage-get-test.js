'use strict'

const test = require('ava')
const listen = require('test-listen')
const axios = require('axios')
const micro = require('micro')
const srv = require('../../index')

const getUrl = fn => {
  const srv = micro(fn)
  return listen(srv)
}

test('it returns README as if /docs', async t => {
  const url = await getUrl(srv)
  const result = await axios.get(`${url}/docs`)
  t.true(result.data.includes('MIT'), 'frontpage ok')
})
