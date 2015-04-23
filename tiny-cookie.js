/*!
 * tiny-cookie - A tiny cookie manipulation plugin
 * https://github.com/Alex1990/tiny-cookie
 * Under the MIT license | (c) Alex Chao
 */

!(function(root, factory) {

  // Uses CommonJS, AMD or browser global to create a jQuery plugin.
  // See: https://github.com/umdjs/umd
  if (typeof define === 'function' && define.amd) {
    // Expose this plugin as an AMD module. Register an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS module
    module.exports = factory();
  } else {
    // Browser globals 
    root.Cookie = factory();
  }

}(this, function(undefined) {

  'use strict';

  // The public function which can get/set/remove cookie.
  function Cookie(key, value, opts) {
    if (value === undefined) {
      return Cookie.get(key);
    } else if (value === null) {
      Cookie.remove(key);
    } else {
      Cookie.set(key, value, opts);
    }
  }

  // Check if the cookie is enabled.
  Cookie.enabled = function() {
    var key = '__test_key';
    var enabled;

    document.cookie = key + '=1';
    enabled = !!document.cookie;

    if (enabled) Cookie.remove(key);

    return enabled;
  };

  // Get the cookie value by the key.
  Cookie.get = function(key) {
    if (typeof key !== 'string' || !key) return null;

    key = '(?:^|;)' + escapeRe(key) + '=?([^;]*?)(?:;|$)';

    var reKey = new RegExp(key);
    var res = reKey.exec(document.cookie.replace(/\s+/g, ''));

    return res !== null ? decodeURIComponent(res[1]) : null;
  };

  // Set a cookie.
  Cookie.set = function(key, value, opts) {
    opts = opts ? convert(opts) : '';
    var cookie = key + '=' + encodeURIComponent(value) + opts;
    document.cookie = cookie;
  };

  // Remove a cookie by the specified key.
  Cookie.remove = function(key) {
    Cookie.set(key, 'a', { expires: new Date().toGMTString() });
  };

  // Helper function
  // ---------------

  // Escape special characters.
  function escapeRe(str) {
    return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
  }

  // Convert an object to a cookie option string.
  function convert(opts) {
    var res = '';
    for (var p in opts) {
      if (opts.hasOwnProperty(p)) {
        res = ';' + p + '=' + opts[p];
      }
    }
    return res;
  }

  return Cookie;

}));
