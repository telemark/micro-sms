const test = require('ava')
const { devDependencies } = require('../../package.json')
const dropModules = []
const isDropped = (module) => !dropModules.includes(module)

if (Object.keys(devDependencies).length > 0) {
  Object.keys(devDependencies).filter(isDropped).forEach((dependency) => {
    test(`${dependency} loads ok`, t => {
      const module = require(dependency)
      t.truthy(module)
    })
  })
} else {
  test('no dev-dependecies to test', t => {
    t.truthy(true)
  })
}
