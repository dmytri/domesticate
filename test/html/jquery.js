/* global describe, it, run */  // mocha globals
/* global $ */ // domesticate imported globals

var domesticate = require('../../index.js')
var assert = require('assert')

domesticate.addDOM(
  function () {
    run()
  }, {
    ignoreInclude: true,
    scripts: [
      {
        'src': 'node_modules/jquery/dist/jquery.min.js',
        'exports': [
          '$'
        ]
      }
    ]
  }
)

describe('domesticate with jQuery', function () {
  it('should make the jquery available', function () {
    assert.equal($('#test').text(), 'test')
  })
})

