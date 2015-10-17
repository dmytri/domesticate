[![Build Status](https://travis-ci.org/dmytri/domesticate.svg)](https://travis-ci.org/dmytri/domesticate)

# Domesticate
## tame your front-end tests.

Testing front-end functionality usually required a lot of tooling, domesticate uses [jsdom](https://github.com/tmpvar/jsdom) so that your front-end components can be tested quickly and easily with nodejs and simple testing tools like [tap](https://github.com/isaacs/node-tap) or [mocha](http://mochajs.org/)

## install

```
$ npm install domesticate --save-dev
```

## writing tests

the example tests below are mocha tests run with mocha --delay so that the dom
is prepared before tests are run, the mocha run function is called in a
domesticate callback.

## provide the dom

```
var assert = require('assert')
var domesticate = require('domesticate')

domesticate.addDOM(
  '<html><body><div id="test">test</div></body></html>',
  function () { run() }
)

describe('domesticate', function () {
  it('should make the dom accessible', function () {
    assert.equal(document.getElementById('test').innerHTML, 'test')
  })
})
```

## provide the dom and jQuery

var assert = require('assert')
var domesticate = require('domesticate')

```
domesticate.makeDOM(
  '<html><body><div id="test">test</div></body></html>',
  [
      [
        "node_modules/jquery/dist/jquery.js",
        "$"
      ]
  ],
  function () { run() }
)

describe('domesticate with jQuery', function () {
  it('should make jquery available', function () {
    assert.equal($('#test').text(), 'test')
  })
})
```

## provide the DOM, Riot and jQuery

```
domesticate.makeDOM(
  '<html><body><my-tag></my-tag></body></html>',
  [
      [
        "node_modules/jquery/dist/jquery.js",
        "$"
      ],
      [
        "node_modules/riot/riot+compiler.js",
        "riot"
      ]
  ],
  function () { run() }
)

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
```

## provide the DOM, React and ReactDOM

```
domesticate.makeDOM(
  '<html><body><div id="test">test</div></body></html>',
  [
      [
        "node_modules/react/dist/react.js",
        "React"
      ],
      [
        "node_modules/react-dom/dist/react-dom.js",
        "ReactDOM"
      ]
  ],
  function () { run() }
)

describe('domesticate with React', function () {
  it('should work with react jsx', function (done) {
    domesticate.transpile('./react.jsx', function (code) {
      return ReactTools.transform(code)
    }, function (MyReact) {
      ReactDOM.render(React.createElement(MyReact, null), document.getElementById('test'))
      document.getElementById('test-form-react-submit').click()
      assert.equal(window.ReactIsWorking, 'working')
      done()
    }, 'MyReact')
  })
})
```

