/* global describe, it, run */ // mocha globals

var domesticate = require('../../index.js')
var assert = require('assert')

domesticate.addDOM(
  function () {
    run()
  }, { ignoreHtml: true, ignoreInclude: true }
)

describe('domesticate', function () {
  it('should make the dom accessible', function () {
    assert.equal(typeof document.body, 'object')
    assert.equal(document.getElementById('trap'), null)
  })
})
