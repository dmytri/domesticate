/* global $, riot, React, ReactDOM, describe, it, run */


var assert = require('assert')
var ReactTools = require('react-tools')
var domesticate = require('./index.js')

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

describe('domesticate with React', function () {
  it('should work with react jsx', function (done) {
    domesticate.transpile('./react.jsx', function (code) {
      return ReactTools.transform(code)
    }, function (MyReact) {
      ReactDOM.render(React.createElement(MyReact, null), document.getElementById('test-react'))
      document.getElementById('test-form-react-submit').click()
      assert.equal(window.ReactIsWorking, 'working')
      done()
    }, 'MyReact')
  })
})

