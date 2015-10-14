
var assert = require('assert')

var ReactTools = require('react-tools')

var makeDOM = require('./index.js').makeDOM
var domesticate = require('./index.js')

domesticate.makeDOM(
  '<html><body><div id="test">test</div><my-tag></my-tag><div id="test-react"></div></body></html>'
  , [
    __dirname + '/node_modules/jquery/dist/jquery.min.js'
    , __dirname + '/node_modules/riot/riot+compiler.min.js'
    , __dirname + '/node_modules/react/dist/react.min.js'
    , __dirname + '/node_modules/react-dom/dist/react-dom.min.js'
  ]
  , function () {
      global.$ = window.$
      global.riot = window.riot
      global.React = window.React
      global.ReactDOM = window.ReactDOM
})

describe('makeDOM', function () {
  it('should make the dom accessible', function () {
    assert.equal(document.getElementById('test').innerHTML, 'test')
  })
})

describe('makeDOM with jQuery', function () {
  it('should make the jquery available', function () {
    assert.equal($('#test').text(), 'test')
  })
})

describe('makeDOM with Riot and jQuery', function () {
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

describe('makeDOM with React', function () {
  it('should work with react jsx', function () {
    domesticate.transpile('./react.jsx', function (code) {
      return ReactTools.transform(code)
    }, 'MyReact',  function (MyReact) {
      ReactDOM.render(React.createElement(MyReact, null), document.getElementById('test-react'))
      document.getElementById('test-form-react-submit').click()
      assert.equal(window.ReactIsWorking, 'working')
    })
  })
})

