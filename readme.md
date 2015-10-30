[![Build Status](https://travis-ci.org/dmytri/domesticate.svg)](https://travis-ci.org/dmytri/domesticate)
[![Dependency Status](https://gemnasium.com/dmytri/domesticate.svg)](https://gemnasium.com/dmytri/domesticate)

```                                                      
   |                             o                    
 __|   __   _  _  _    _   , _|_     __   __, _|_  _  
/  |  /  \_/ |/ |/ |  |/  / \_|  |  /    /  |  |  |/  
\_/|_/\__/   |  |  |_/|__/ \/ |_/|_/\___/\_/|_/|_/|__/
```
```javascript
// quick example with tape
test('domesticate', function (t) {
  t.plan(1)
  domesticate.addDOM(
    function () {
      t.equal(typeof document.body, 'object', 'document body should be typeof object')
    }
  )
})
```

> "Exotic: a plant, shrub or tree, not native; a plant introduced from a
> foreign country" -- *Webster*
>
> Most poetical translations resemble the reverse side of a piece of Gobelin
> tapestry. The figures and colours are there, but the charm is wanting. But
> what is the use of making a translation at all, unless you can infuse into it
> some that element which makes the original poem immortal? If the essential
> spirit, which is the attraction in it, has evaporated, of what advantage is
> the residdum? You present us with an English version of an ode of Horace, or
> a song of Goethe; and we can only say "If this where all. Horace and Goethe
> would not be remembered ten years, Why is it, then, that they are immortal?"
> 
> The reason why we who translate are not aware of own failures is perhaps
> this, -- that we are so enchanted with the original poem that we associate
> this pleasure with our own. A translater does not see the bladness and
> prosaic character of their work, because every word suggest to them the
> beauty which it is meant to represent. So a person travelling through
> pcituresque scenery sometimes makes rud sketches of what he sees, which
> convey to others no idea of the landscape; but to them the are accociated
> with the light, the color, the perspectve, in effable charm of nature, so are
> valuable to them as souveniers of the scene.
> 
> A successfull translation must produce in the reader unacquanited with the
> original the same sort of feeling which that conveys. The ideal of a
> translation would be one which , if the original were lost, would remain
> forever as immortal. Without any thought of it as a translation, it should
> give as so much pleasure in itself as to a live of its own in literature. Is
> this impossibe? We have some examples to prove that it can be done.

> -- "Exotics: attemps to domesticate them, J.F.C and L.C, 1875" 

# Domesticate

Testing front-end functionality usually requires a lot of tooling, browser
automation software or services, with the requisite yack shaving and
biolerplating to make it go, and still the resulting tests are slow, brittle
and often convoluted.

Domesticate uses [jsdom](https://github.com/tmpvar/jsdom) to make front-end
tests at home in the shell, so they are simple, expressive and fast, with
minimal setup rigamarole.

## install

```
$ npm install domesticate --save-dev
```

## writing tests

the example tests below are mocha tests run with mocha --delay so that the dom
is prepared before tests are run, the mocha run function is called in a
domesticate callback.

## provide the dom

```javascript
var assert = require('assert')
var domesticate = require('domesticate')

domesticate.addDOM(
  function () { run() }
)

describe('domesticate', function () {
  it('should make the dom accessible', function () {
    assert.equal(document.getElementById('test').innerHTML, 'test')
  })
})

```

## configure the dom

The above test will fail at first, because there is no element with the id
"test" in the dom by default, to add it, we need to add a domesticate section
to our project's package.json.


```json
"domesticate": {
  "html": "<html><head></head><body><div id=\"test\">test</div></body></html>"
}
```

Now our test will pass, because domestivate will add the html to the dom that
os available to our test. You can also include this html from a file by
replacing "html" with "include"

```json
"domesticate": {
  "include": "/path/to/testdom.html"
}
```

## adding scripts

Scripts like jquery can be added as well.

```json
"domesticate": {
  "html": "<html><head></head><body><div id=\"test\">test</div></body></html>",
  "scripts": [
    {
      "src": "/path/to/jquery.js",
      "exports": [
        "$"
      ]
    }
  ]
}
```

Exports tells domesticate which globals defined by the script to make available
for your tests, and src is the path to the script.

## transpiling

You can include code written in jsx, riot tags, coffeescript, es6 or whatever
by using domesticate.transpile. Which takes two arguments, the path to the code
and a callback wich will transpile and return plain javascript. i.e, this React
class:

```javascript
window.MyReact = React.createClass({
  work: function (event) {
    window.ReactIsWorking = 'working'
  },
  render: function () {
    return (
      <form id='test-form-react' onSubmit={this.work}>
        <input id='test-form-react-submit' type='submit' onClick={this.work}></input>
      </form>
    )
  }
})

```

Can be tested as follows:

```javascript
var domesticate = require('domesticate')
var assert = require('assert')
var ReactTools = require('react-tools')

domesticate.addDOM(function () { run() })

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
```

for the above test to work, 'test-react' must be present in the dom, by way of
either "html" or "include" in the "domesticate" section of your package.json,
react and react-dom, must be present in the "scripts" of your "domesticate"
section, and the node module "react-tools' must be installed.

> "Caelum non animum mutant qui trans mare currunt."

Domesticate is a very short script, if you want to understand what it does
better, see examples in tests and read the source code.


