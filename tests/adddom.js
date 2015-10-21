/* global describe, it, run */  // mocha globals
/* global $, riot, */           // domesticate injected globals

var domesticate = require('../index.js')
var assert = require('assert')

domesticate.addDOM(
  function () { run() }
)

describe('domesticate', function () {
  it('should make the dom accessible', function () {
    assert.equal(document.getElementById('test').innerHTML, 'test')
  })
})

