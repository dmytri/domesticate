;(function () {
  var jsdom = require('jsdom')
  var fs = require('fs')
  var config = require('pkg-config')('domesticate', { root: null }) || {}

  function addDOM (html, callback, scripts) {
    html = html || '<html><head></head><body></body></html>'
    scripts = scripts || []
    var paths = []
    var globals = []
    if (typeof config.scripts === 'object') scripts = scripts.concat(config.scripts)
    for (var s in scripts) {
      paths.push(scripts[s].src)
      if (typeof scripts[s].exports === 'object') {
        globals = globals.concat(scripts[s].exports)
      }
    }
    jsdom.env({
      html: html,
      scripts: paths,
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

  module.exports = { addDOM: addDOM, transpile: transpile }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
