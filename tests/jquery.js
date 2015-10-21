/* global describe, it, run */  // mocha globals
/* global $, riot, */           // domesticate injected globals

var domesticate = require('../index.js')
var assert = require('assert')

domesticate.addDOM(
  function () { run() }
)

describe('domesticate with jQuery', function () {
  it('should make the jquery available', function () {
    assert.equal($('#test').text(), 'test')
  })
})

