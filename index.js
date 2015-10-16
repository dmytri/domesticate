;(function () {
  var jsdom = require('jsdom')
  var fs = require('fs')
  var config = require('pkg-config')('domesticate', { root: null })

  function makeDOM (html, scripts, globals, callback) {
    html = html ||  '<html><head></head><body></body></html>'
    scripts = scripts || []
    globals = globals || []
    if (config.scripts) {
      for (var s in config.scripts) {
        scripts.push(config.scripts[s][0])
        if (config.scripts[s].length > 1) {
          globals = globals.concat(config.scripts[s].slice(1))
        }
      }
    }
    jsdom.env({
      html: html,
      scripts: scripts,
      features: {
        FetchExternalResources: ['script'],
        ProcessExternalResources: ['script']
      },
      done: function (errors, window) {
        if (errors != null) console.log('Errors', errors)
        global.window = window
        global.document = window.document
        for (var g in globals) {
          global[globals[g]] = window[globals[g]]
        }
        if (typeof callback === 'function') callback()
      }
    })
  }

  function addDOM (html, callback) {
    makeDOM(html, null, null, callback)
  }

  function transpile (filename, callback, then, args) {
    if (typeof callback === 'function') {
      var code = fs.readFileSync(filename, 'utf8')
      if (typeof then === 'function') {
        args = args || ''
        code = code + '\nthen(' + args + ')'
      }
      var transpiled = callback(code)
      /* eslint-disable */
      eval(transpiled)
      /* eslint-enable */
    }
  }

  module.exports = { makeDOM: makeDOM, addDOM: addDOM, transpile: transpile }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
