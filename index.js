/*
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *   Domesticate: Make Browser UI Tests at Home in Node
 *   Dmytri Kleiner <dk@trick.ca>
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 *********************************************************/

/* globals global, console, require, module */

;(function () { // eslint-disable-line no-extra-semi
  var jsdom = require('jsdom')
  var fs = require('fs')
  /* istanbul ignore next */
  var config = require('pkg-config')('domesticate', { root: null }) || {}

  function addDOM (callback, options) {
    options = options || {}
    var scripts = options.scripts || []
    var html = options.html || '<html><head></head><body></body></html>'
    var paths = []
    var globals = []
    /* istanbul ignore else */
    if (typeof config.scripts === 'object') {
      scripts = scripts.concat(config.scripts)
    }
    for (var s in scripts) {
      /* istanbul ignore else */
      if (scripts.hasOwnProperty(s) && typeof scripts[s].exports === 'object') {
        paths.push(scripts[s].src)
        globals = globals.concat(scripts[s].exports)
      }
    }
    if (!options.html) {
      if (!options.ignoreHtml && typeof config.html === 'string') {
        html = config.html
      }
      if (!options.ignoreInclude && typeof config.include === 'string') {
        html = fs.readFileSync(config.include, 'utf8')
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
        /* istanbul ignore if */
        if (errors != null) {
          console.log('Errors', errors) // eslint-disable-line no-console
        }
        global.window = window
        global.document = window.document
        for (var g in globals) {
          /* istanbul ignore else */
          if (globals.hasOwnProperty(g)) {
            global[globals[g]] = window[globals[g]]
          }
        }
        /* istanbul ignore else */
        if (typeof callback === 'function') {
          callback(window)
        }
      }
    })
  }

  function compile (filename, code, callback) {
    if (typeof code === 'string') {
      process(code)
    /* istanbul ignore else */
    } else if (typeof code.setEncoding === 'function') {
      var parts = []
      code.setEncoding('utf8')
      .on('data', function (data) {
        /* istanbul ignore else */
        if (typeof data === 'string') {
          parts.push(data)
        }
      })
      .on('end', function () {
        process(parts.join(''))
      })
    }
    function process (code) {
      module._compile(code, filename)
      if (typeof callback === 'function') callback()
    }
  }

  function transpile (filename, callback, done) {
    /* istanbul ignore else */
    if (typeof callback === 'function') {
      var code = fs.readFileSync(filename, 'utf8')
      var transpiled = callback(code)
      compile(filename, transpiled, done)
    }
  }

  module.exports = { addDOM: addDOM, compile: compile, transpile: transpile }
}())

// vim: tabstop=2 shiftwidth=2 expandtab
