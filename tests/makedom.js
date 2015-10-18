/* global describe, it, run */        // mocha globals
/* global React, ReactDOM */ // domesticate injected globals

var domesticate = require('../index.js')
var assert = require('assert')
var ReactTools = require('react-tools')

domesticate.addDOM(
  '<html><body><div id="test">test</div><my-tag></my-tag><div id="test-react"></div></body></html>',
  function () { run() },
  [
      {
        'src': 'node_modules/react/dist/react.js',
        'exports': ['React']
      },
      {
        'src': 'node_modules/react-dom/dist/react-dom.js',
        'exports': ['ReactDOM']
      }
  ]
)

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

