;(function () {

  var jsdom = require('jsdom')
  var fs = require('fs')

  function makeDOM (html, scripts, callback) {
    html = html || '<html><head></head><body></body></html>'
    scripts = scripts || []
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
        if (typeof callback === 'function') callback()
      }
    })
  }

  function transpile (filename, callback, args, then) {
    if (typeof callback === 'function') {
      var code = fs.readFileSync(filename, 'utf8')
      if (typeof then === 'function') code = code + '\nthen(' + args + ')'
      var transpiled = callback(code)
      eval(transpiled)
    }
  }

  module.exports = { makeDOM: makeDOM, transpile: transpile }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
