/* global describe, it, run */  // mocha globals
/* global $, riot, */           // domesticate injected globals

var domesticate = require('../index.js')
var assert = require('assert')

domesticate.addDOM(
  '<html><body><div id="test">test</div><my-tag></my-tag><div id="test-react"></div></body></html>',
  function () { run() }
)

describe('domesticate', function () {
  it('should make the dom accessible', function () {
    assert.equal(document.getElementById('test').innerHTML, 'test')
  })
})

describe('domesticate with jQuery', function () {
  it('should make the jquery available', function () {
    assert.equal($('#test').text(), 'test')
  })
})

describe('domesticate with Riot and jQuery', function () {
  it('should work with riot tags', function (done) {
    domesticate.transpile('./riot.tag', function (code) {
      return riot.compile(code)
    })
    var tag = riot.mount('my-tag')[0]
    tag.on('submit', function () {
      done()
    })
    $('#test-form-riot').submit()
  })
})

