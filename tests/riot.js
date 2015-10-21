/* global describe, it, run */  // mocha globals
/* global $, riot, */           // domesticate injected globals

var domesticate = require('../index.js')
var assert = require('assert')

domesticate.addDOM(
  function () { run() }
)

describe('domesticate with Riot', function () {
  it('should work with riot tags', function (done) {
    domesticate.transpile('./riot.tag', function (code) {
      return riot.compile(code)
    })
    var tag = riot.mount('my-tag')[0]
    tag.on('submit', function () {
      done()
    })
    document.getElementById('test-form-riot-submit').click()
  })
})

