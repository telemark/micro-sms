const test = require('ava')
const { dependencies } = require('../../package.json')
const dropModules = []
const isDropped = (module) => !dropModules.includes(module)

if (Object.keys(dependencies).length > 0) {
  Object.keys(dependencies).filter(isDropped).forEach((dependency) => {
    test(`${dependency} loads ok`, t => {
      const module = require(dependency)
      t.truthy(module)
    })
  })
} else {
  test('no dependecies to test', t => {
    t.truthy(true)
  })
}
