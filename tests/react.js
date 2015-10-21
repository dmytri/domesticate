/* global describe, it, run */        // mocha globals
/* global React, ReactDOM */ // domesticate injected globals

var domesticate = require('../index.js')
var assert = require('assert')
var ReactTools = require('react-tools')

domesticate.addDOM(
  function () { run() }
)

describe('domesticate with React', function () {
  it('should work with react jsx', function () {
    domesticate.transpile('./react.jsx', function (code) {
      return ReactTools.transform(code)
    })
    ReactDOM.render(React.createElement(window.MyReact, null), document.getElementById('test-react'))
    document.getElementById('test-form-react-submit').click()
    assert.equal(window.ReactIsWorking, 'working')
  })
})

