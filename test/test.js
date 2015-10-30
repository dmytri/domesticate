/* globals $, riot, React, ReactDOM */ // injected by domesticate

var domesticate = require('../index.js')
var test = require('tape')

// tests using domesticate default dom
test('domesticate', function (t) {
  t.plan(2)
  domesticate.addDOM(
    function () {
      t.equal(typeof document.body, 'object', 'document body should be typeof object')
      t.equal(document.getElementById('trap'), null, 'trap div should not exist') // in testdom included in package.json
    }, {
      ignoreHtml: true, // ignore html in package.json
      ignoreInclude: true  // ignore include in package.json
    }
  )
})

// tests using scripts from options and testdom included in package.json
var nock = require('nock')
test('domesticate with jQuery', function (t) {
  t.plan(2)
  domesticate.addDOM(
    function () {
      t.equal($('#test').text(), 'test', 'test div should contain test')
      nock('http://localhost')
      .get('/test')
      .reply(200, {})
      $.ajax({
        url: '/test'
      }).done(function (data) {
        t.pass('ajax should work')
      })
    }, {
      ignoreInclude: true, // ignore include in package.json
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
})

// tests using testdom and scripts included in package.json
var ReactTools = require('react-tools')
test('domesticate with React', function (t) {
  t.plan(1)
  domesticate.addDOM(function () {
    domesticate.transpile('./test/react.jsx', function (code) {
      return ReactTools.transform(code)
    })
    ReactDOM.render(React.createElement(window.MyReact, null), document.getElementById('test-react'))
    document.getElementById('test-form-react-submit').click()
    t.equal(window.ReactIsWorking, 'working', 'react click handler should run')
  })
})

// test using html from options and scripts included in package.json
test('domesticate with Riot', function (t) {
  t.plan(1)
  domesticate.addDOM(function () {
    domesticate.transpile('./test/riot.tag', function (code) {
      return riot.compile(code)
    })
    var tag = riot.mount('my-tag')[0]
    tag.on('submit', function () {
      t.pass('riot form should submit on click')
    })
    document.getElementById('test-form-riot-submit').click()
  }, {
    html: '<html><head></head><body><my-tag></my-tag></body></html>'
  })
})
