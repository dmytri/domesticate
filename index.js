;(function () {
  var jsdom = require('jsdom')
  var fs = require('fs')
  var config = require('pkg-config')('domesticate', { root: null }) || {}

  function addDOM (callback, options) {
    options = options || {}
    var scripts = options.scripts || []
    var paths = []
    var globals = []
    if (typeof config.scripts === 'object') scripts = scripts.concat(config.scripts)
    for (var s in scripts) {
      paths.push(scripts[s].src)
      if (typeof scripts[s].exports === 'object') {
        globals = globals.concat(scripts[s].exports)
      }
    }
    var html = '<html><head></head><body></body></html>'
    if (!options.ignoreHtml && typeof config.html === 'string') html = config.html
    if (!options.ignoreInclude && typeof config.include === 'string') html = fs.readFileSync(config.include, 'utf8')
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
        if (typeof callback === 'function') callback(window)
      }
    })
  }

  function transpile (filename, callback) {
    if (typeof callback === 'function') {
      var code = fs.readFileSync(filename, 'utf8')
      var transpiled = callback(code)
      module._compile(transpiled, filename)
    }
  }

  module.exports = { addDOM: addDOM, transpile: transpile }
}())

/* vim set tabstop=2 shiftwidth=2 expandtab */
