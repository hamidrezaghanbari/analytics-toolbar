/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["InspectorToolbar"] = factory();
	else
		root["InspectorToolbar"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("{\n\nmodule.exports = ansiHTML\n\n// Reference to https://github.com/sindresorhus/ansi-regex\nvar _regANSI = /(?:(?:\\u001b\\[)|\\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\\u001b[A-M]/\n\nvar _defColors = {\n  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]\n  black: '000',\n  red: 'ff0000',\n  green: '209805',\n  yellow: 'e8bf03',\n  blue: '0000ff',\n  magenta: 'ff00ff',\n  cyan: '00ffee',\n  lightgrey: 'f0f0f0',\n  darkgrey: '888'\n}\nvar _styles = {\n  30: 'black',\n  31: 'red',\n  32: 'green',\n  33: 'yellow',\n  34: 'blue',\n  35: 'magenta',\n  36: 'cyan',\n  37: 'lightgrey'\n}\nvar _openTags = {\n  '1': 'font-weight:bold', // bold\n  '2': 'opacity:0.5', // dim\n  '3': '<i>', // italic\n  '4': '<u>', // underscore\n  '8': 'display:none', // hidden\n  '9': '<del>' // delete\n}\nvar _closeTags = {\n  '23': '</i>', // reset italic\n  '24': '</u>', // reset underscore\n  '29': '</del>' // reset delete\n}\n\n;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {\n  _closeTags[n] = '</span>'\n})\n\n/**\n * Converts text with ANSI color codes to HTML markup.\n * @param {String} text\n * @returns {*}\n */\nfunction ansiHTML (text) {\n  // Returns the text if the string has no ANSI escape code.\n  if (!_regANSI.test(text)) {\n    return text\n  }\n\n  // Cache opened sequence.\n  var ansiCodes = []\n  // Replace with markup.\n  var ret = text.replace(/\\033\\[(\\d+)m/g, function (match, seq) {\n    var ot = _openTags[seq]\n    if (ot) {\n      // If current sequence has been opened, close it.\n      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast\n        ansiCodes.pop()\n        return '</span>'\n      }\n      // Open tag.\n      ansiCodes.push(seq)\n      return ot[0] === '<' ? ot : '<span style=\"' + ot + ';\">'\n    }\n\n    var ct = _closeTags[seq]\n    if (ct) {\n      // Pop sequence\n      ansiCodes.pop()\n      return ct\n    }\n    return ''\n  })\n\n  // Make sure tags are closed.\n  var l = ansiCodes.length\n  ;(l > 0) && (ret += Array(l + 1).join('</span>'))\n\n  return ret\n}\n\n/**\n * Customize colors.\n * @param {Object} colors reference to _defColors\n */\nansiHTML.setColors = function (colors) {\n  if (typeof colors !== 'object') {\n    throw new Error('`colors` parameter must be an Object.')\n  }\n\n  var _finalColors = {}\n  for (var key in _defColors) {\n    var hex = colors.hasOwnProperty(key) ? colors[key] : null\n    if (!hex) {\n      _finalColors[key] = _defColors[key]\n      continue\n    }\n    if ('reset' === key) {\n      if (typeof hex === 'string') {\n        hex = [hex]\n      }\n      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {\n        return typeof h !== 'string'\n      })) {\n        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')\n      }\n      var defHexColor = _defColors[key]\n      if (!hex[0]) {\n        hex[0] = defHexColor[0]\n      }\n      if (hex.length === 1 || !hex[1]) {\n        hex = [hex[0]]\n        hex.push(defHexColor[1])\n      }\n\n      hex = hex.slice(0, 2)\n    } else if (typeof hex !== 'string') {\n      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')\n    }\n    _finalColors[key] = hex\n  }\n  _setTags(_finalColors)\n}\n\n/**\n * Reset colors.\n */\nansiHTML.reset = function () {\n  _setTags(_defColors)\n}\n\n/**\n * Expose tags, including open and close.\n * @type {Object}\n */\nansiHTML.tags = {}\n\nif (Object.defineProperty) {\n  Object.defineProperty(ansiHTML.tags, 'open', {\n    get: function () { return _openTags }\n  })\n  Object.defineProperty(ansiHTML.tags, 'close', {\n    get: function () { return _closeTags }\n  })\n} else {\n  ansiHTML.tags.open = _openTags\n  ansiHTML.tags.close = _closeTags\n}\n\nfunction _setTags (colors) {\n  // reset all\n  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]\n  // inverse\n  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]\n  // dark grey\n  _openTags['90'] = 'color:#' + colors.darkgrey\n\n  for (var code in _styles) {\n    var color = _styles[code]\n    var oriColor = colors[color] || '000'\n    _openTags[code] = 'color:#' + oriColor\n    code = parseInt(code)\n    _openTags[(code + 10).toString()] = 'background:#' + oriColor\n  }\n}\n\nansiHTML.reset()\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/ansi-html-community/index.js?\n}");

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
eval("{// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/events/events.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WebSocketClient)\n/* harmony export */ });\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\nvar WebSocketClient = /*#__PURE__*/function () {\n  /**\n   * @param {string} url\n   */\n  function WebSocketClient(url) {\n    _classCallCheck(this, WebSocketClient);\n    this.client = new WebSocket(url);\n    this.client.onerror = function (error) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);\n    };\n  }\n\n  /**\n   * @param {(...args: any[]) => void} f\n   */\n  return _createClass(WebSocketClient, [{\n    key: \"onOpen\",\n    value: function onOpen(f) {\n      this.client.onopen = f;\n    }\n\n    /**\n     * @param {(...args: any[]) => void} f\n     */\n  }, {\n    key: \"onClose\",\n    value: function onClose(f) {\n      this.client.onclose = f;\n    }\n\n    // call f with the message string as the first argument\n    /**\n     * @param {(...args: any[]) => void} f\n     */\n  }, {\n    key: \"onMessage\",\n    value: function onMessage(f) {\n      this.client.onmessage = function (e) {\n        f(e.data);\n      };\n    }\n  }]);\n}();\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/clients/WebSocketClient.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{var __resourceQuery = \"?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSocketURL: () => (/* binding */ createSocketURL),\n/* harmony export */   getCurrentScriptSource: () => (/* binding */ getCurrentScriptSource),\n/* harmony export */   parseURL: () => (/* binding */ parseURL)\n/* harmony export */ });\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ \"./node_modules/webpack/hot/log.js\");\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack/hot/emitter.js */ \"./node_modules/webpack/hot/emitter.js\");\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket.js */ \"./node_modules/webpack-dev-server/client/socket.js\");\n/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay.js */ \"./node_modules/webpack-dev-server/client/overlay.js\");\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/sendMessage.js */ \"./node_modules/webpack-dev-server/client/utils/sendMessage.js\");\n/* harmony import */ var _progress_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./progress.js */ \"./node_modules/webpack-dev-server/client/progress.js\");\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n/* global __resourceQuery, __webpack_hash__ */\n/// <reference types=\"webpack/module\" />\n\n\n\n\n\n\n\n\n/**\n * @typedef {Object} OverlayOptions\n * @property {boolean | (error: Error) => boolean} [warnings]\n * @property {boolean | (error: Error) => boolean} [errors]\n * @property {boolean | (error: Error) => boolean} [runtimeErrors]\n * @property {string} [trustedTypesPolicyName]\n */\n\n/**\n * @typedef {Object} Options\n * @property {boolean} hot\n * @property {boolean} liveReload\n * @property {boolean} progress\n * @property {boolean | OverlayOptions} overlay\n * @property {string} [logging]\n * @property {number} [reconnect]\n */\n\n/**\n * @typedef {Object} Status\n * @property {boolean} isUnloading\n * @property {string} currentHash\n * @property {string} [previousHash]\n */\n\n/**\n * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions\n */\nvar decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {\n  if (_typeof(overlayOptions) === \"object\") {\n    [\"warnings\", \"errors\", \"runtimeErrors\"].forEach(function (property) {\n      if (typeof overlayOptions[property] === \"string\") {\n        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);\n\n        // eslint-disable-next-line no-new-func\n        overlayOptions[property] = new Function(\"message\", \"var callback = \".concat(overlayFilterFunctionString, \"\\n        return callback(message)\"));\n      }\n    });\n  }\n};\n\n/**\n * @type {Status}\n */\nvar status = {\n  isUnloading: false,\n  // eslint-disable-next-line camelcase\n  currentHash: __webpack_require__.h()\n};\n\n/**\n * @returns {string}\n */\nvar getCurrentScriptSource = function getCurrentScriptSource() {\n  // `document.currentScript` is the most accurate way to find the current script,\n  // but is not supported in all browsers.\n  if (document.currentScript) {\n    return document.currentScript.getAttribute(\"src\");\n  }\n\n  // Fallback to getting all scripts running in the document.\n  var scriptElements = document.scripts || [];\n  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {\n    return element.getAttribute(\"src\");\n  });\n  if (scriptElementsWithSrc.length > 0) {\n    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];\n    return currentScript.getAttribute(\"src\");\n  }\n\n  // Fail as there was no script to use.\n  throw new Error(\"[webpack-dev-server] Failed to get current script source.\");\n};\n\n/**\n * @param {string} resourceQuery\n * @returns {{ [key: string]: string | boolean }}\n */\nvar parseURL = function parseURL(resourceQuery) {\n  /** @type {{ [key: string]: string }} */\n  var result = {};\n  if (typeof resourceQuery === \"string\" && resourceQuery !== \"\") {\n    var searchParams = resourceQuery.slice(1).split(\"&\");\n    for (var i = 0; i < searchParams.length; i++) {\n      var pair = searchParams[i].split(\"=\");\n      result[pair[0]] = decodeURIComponent(pair[1]);\n    }\n  } else {\n    // Else, get the url from the <script> this file was called with.\n    var scriptSource = getCurrentScriptSource();\n    var scriptSourceURL;\n    try {\n      // The placeholder `baseURL` with `window.location.href`,\n      // is to allow parsing of path-relative or protocol-relative URLs,\n      // and will have no effect if `scriptSource` is a fully valid URL.\n      scriptSourceURL = new URL(scriptSource, self.location.href);\n    } catch (error) {\n      // URL parsing failed, do nothing.\n      // We will still proceed to see if we can recover using `resourceQuery`\n    }\n    if (scriptSourceURL) {\n      result = scriptSourceURL;\n      result.fromCurrentScript = true;\n    }\n  }\n  return result;\n};\nvar parsedResourceQuery = parseURL(__resourceQuery);\nvar enabledFeatures = {\n  \"Hot Module Replacement\": false,\n  \"Live Reloading\": false,\n  Progress: false,\n  Overlay: false\n};\n\n/** @type {Options} */\nvar options = {\n  hot: false,\n  liveReload: false,\n  progress: false,\n  overlay: false\n};\nif (parsedResourceQuery.hot === \"true\") {\n  options.hot = true;\n  enabledFeatures[\"Hot Module Replacement\"] = true;\n}\nif (parsedResourceQuery[\"live-reload\"] === \"true\") {\n  options.liveReload = true;\n  enabledFeatures[\"Live Reloading\"] = true;\n}\nif (parsedResourceQuery.progress === \"true\") {\n  options.progress = true;\n  enabledFeatures.Progress = true;\n}\nif (parsedResourceQuery.overlay) {\n  try {\n    options.overlay = JSON.parse(parsedResourceQuery.overlay);\n  } catch (e) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(\"Error parsing overlay options from resource query:\", e);\n  }\n\n  // Fill in default \"true\" params for partially-specified objects.\n  if (_typeof(options.overlay) === \"object\") {\n    options.overlay = _objectSpread({\n      errors: true,\n      warnings: true,\n      runtimeErrors: true\n    }, options.overlay);\n    decodeOverlayOptions(options.overlay);\n  }\n  enabledFeatures.Overlay = options.overlay !== false;\n}\nif (parsedResourceQuery.logging) {\n  options.logging = parsedResourceQuery.logging;\n}\nif (typeof parsedResourceQuery.reconnect !== \"undefined\") {\n  options.reconnect = Number(parsedResourceQuery.reconnect);\n}\n\n/**\n * @param {string} level\n */\nvar setAllLogLevel = function setAllLogLevel(level) {\n  // This is needed because the HMR logger operate separately from dev server logger\n  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === \"verbose\" || level === \"log\" ? \"info\" : level);\n  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_4__.setLogLevel)(level);\n};\nif (options.logging) {\n  setAllLogLevel(options.logging);\n}\nvar logEnabledFeatures = function logEnabledFeatures(features) {\n  var listEnabledFeatures = Object.keys(features);\n  if (!features || listEnabledFeatures.length === 0) {\n    return;\n  }\n  var logString = \"Server started:\";\n\n  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.\n  for (var i = 0; i < listEnabledFeatures.length; i++) {\n    var key = listEnabledFeatures[i];\n    logString += \" \".concat(key, \" \").concat(features[key] ? \"enabled\" : \"disabled\", \",\");\n  }\n  // replace last comma with a period\n  logString = logString.slice(0, -1).concat(\".\");\n  _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(logString);\n};\nlogEnabledFeatures(enabledFeatures);\nself.addEventListener(\"beforeunload\", function () {\n  status.isUnloading = true;\n});\nvar overlay = typeof window !== \"undefined\" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.createOverlay)(_typeof(options.overlay) === \"object\" ? {\n  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,\n  catchRuntimeError: options.overlay.runtimeErrors\n} : {\n  trustedTypesPolicyName: false,\n  catchRuntimeError: options.overlay\n}) : {\n  send: function send() {}\n};\n\n/**\n * @param {Options} options\n * @param {Status} currentStatus\n */\nvar reloadApp = function reloadApp(_ref, currentStatus) {\n  var hot = _ref.hot,\n    liveReload = _ref.liveReload;\n  if (currentStatus.isUnloading) {\n    return;\n  }\n  var currentHash = currentStatus.currentHash,\n    previousHash = currentStatus.previousHash;\n  var isInitial = currentHash.indexOf(/** @type {string} */previousHash) >= 0;\n  if (isInitial) {\n    return;\n  }\n\n  /**\n   * @param {Window} rootWindow\n   * @param {number} intervalId\n   */\n  function applyReload(rootWindow, intervalId) {\n    clearInterval(intervalId);\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(\"App updated. Reloading...\");\n    rootWindow.location.reload();\n  }\n  var search = self.location.search.toLowerCase();\n  var allowToHot = search.indexOf(\"webpack-dev-server-hot=false\") === -1;\n  var allowToLiveReload = search.indexOf(\"webpack-dev-server-live-reload=false\") === -1;\n  if (hot && allowToHot) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(\"App hot update...\");\n    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_1___default().emit(\"webpackHotUpdate\", currentStatus.currentHash);\n    if (typeof self !== \"undefined\" && self.window) {\n      // broadcast update to window\n      self.postMessage(\"webpackHotUpdate\".concat(currentStatus.currentHash), \"*\");\n    }\n  }\n  // allow refreshing the page only if liveReload isn't disabled\n  else if (liveReload && allowToLiveReload) {\n    var rootWindow = self;\n\n    // use parent window for reload (in case we're in an iframe with no valid src)\n    var intervalId = self.setInterval(function () {\n      if (rootWindow.location.protocol !== \"about:\") {\n        // reload immediately if protocol is valid\n        applyReload(rootWindow, intervalId);\n      } else {\n        rootWindow = rootWindow.parent;\n        if (rootWindow.parent === rootWindow) {\n          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways\n          applyReload(rootWindow, intervalId);\n        }\n      }\n    });\n  }\n};\nvar ansiRegex = new RegExp([\"[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)\", \"(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-nq-uy=><~]))\"].join(\"|\"), \"g\");\n\n/**\n *\n * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.\n * Adapted from code originally released by Sindre Sorhus\n * Licensed the MIT License\n *\n * @param {string} string\n * @return {string}\n */\nvar stripAnsi = function stripAnsi(string) {\n  if (typeof string !== \"string\") {\n    throw new TypeError(\"Expected a `string`, got `\".concat(_typeof(string), \"`\"));\n  }\n  return string.replace(ansiRegex, \"\");\n};\nvar onSocketMessage = {\n  hot: function hot() {\n    if (parsedResourceQuery.hot === \"false\") {\n      return;\n    }\n    options.hot = true;\n  },\n  liveReload: function liveReload() {\n    if (parsedResourceQuery[\"live-reload\"] === \"false\") {\n      return;\n    }\n    options.liveReload = true;\n  },\n  invalid: function invalid() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(\"App updated. Recompiling...\");\n\n    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"Invalid\");\n  },\n  /**\n   * @param {string} hash\n   */\n  hash: function hash(_hash) {\n    status.previousHash = status.currentHash;\n    status.currentHash = _hash;\n  },\n  logging: setAllLogLevel,\n  /**\n   * @param {boolean} value\n   */\n  overlay: function overlay(value) {\n    if (typeof document === \"undefined\") {\n      return;\n    }\n    options.overlay = value;\n    decodeOverlayOptions(options.overlay);\n  },\n  /**\n   * @param {number} value\n   */\n  reconnect: function reconnect(value) {\n    if (parsedResourceQuery.reconnect === \"false\") {\n      return;\n    }\n    options.reconnect = value;\n  },\n  /**\n   * @param {boolean} value\n   */\n  progress: function progress(value) {\n    options.progress = value;\n  },\n  /**\n   * @param {{ pluginName?: string, percent: number, msg: string }} data\n   */\n  \"progress-update\": function progressUpdate(data) {\n    if (options.progress) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(\"\".concat(data.pluginName ? \"[\".concat(data.pluginName, \"] \") : \"\").concat(data.percent, \"% - \").concat(data.msg, \".\"));\n    }\n    if ((0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.isProgressSupported)()) {\n      if (typeof options.progress === \"string\") {\n        var progress = document.querySelector(\"wds-progress\");\n        if (!progress) {\n          (0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.defineProgressElement)();\n          progress = document.createElement(\"wds-progress\");\n          document.body.appendChild(progress);\n        }\n        progress.setAttribute(\"progress\", data.percent);\n        progress.setAttribute(\"type\", options.progress);\n      }\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"Progress\", data);\n  },\n  \"still-ok\": function stillOk() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(\"Nothing changed.\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"StillOk\");\n  },\n  ok: function ok() {\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"Ok\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    reloadApp(options, status);\n  },\n  /**\n   * @param {string} file\n   */\n  \"static-changed\": function staticChanged(file) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(\"\".concat(file ? \"\\\"\".concat(file, \"\\\"\") : \"Content\", \" from static directory was changed. Reloading...\"));\n    self.location.reload();\n  },\n  /**\n   * @param {Error[]} warnings\n   * @param {any} params\n   */\n  warnings: function warnings(_warnings, params) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn(\"Warnings while compiling.\");\n    var printableWarnings = _warnings.map(function (error) {\n      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.formatProblem)(\"warning\", error),\n        header = _formatProblem.header,\n        body = _formatProblem.body;\n      return \"\".concat(header, \"\\n\").concat(stripAnsi(body));\n    });\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"Warnings\", printableWarnings);\n    for (var i = 0; i < printableWarnings.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn(printableWarnings[i]);\n    }\n    var overlayWarningsSetting = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.warnings;\n    if (overlayWarningsSetting) {\n      var warningsToDisplay = typeof overlayWarningsSetting === \"function\" ? _warnings.filter(overlayWarningsSetting) : _warnings;\n      if (warningsToDisplay.length) {\n        overlay.send({\n          type: \"BUILD_ERROR\",\n          level: \"warning\",\n          messages: _warnings\n        });\n      }\n    }\n    if (params && params.preventReloading) {\n      return;\n    }\n    reloadApp(options, status);\n  },\n  /**\n   * @param {Error[]} errors\n   */\n  errors: function errors(_errors) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(\"Errors while compiling. Reload prevented.\");\n    var printableErrors = _errors.map(function (error) {\n      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_3__.formatProblem)(\"error\", error),\n        header = _formatProblem2.header,\n        body = _formatProblem2.body;\n      return \"\".concat(header, \"\\n\").concat(stripAnsi(body));\n    });\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"Errors\", printableErrors);\n    for (var i = 0; i < printableErrors.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(printableErrors[i]);\n    }\n    var overlayErrorsSettings = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.errors;\n    if (overlayErrorsSettings) {\n      var errorsToDisplay = typeof overlayErrorsSettings === \"function\" ? _errors.filter(overlayErrorsSettings) : _errors;\n      if (errorsToDisplay.length) {\n        overlay.send({\n          type: \"BUILD_ERROR\",\n          level: \"error\",\n          messages: _errors\n        });\n      }\n    }\n  },\n  /**\n   * @param {Error} error\n   */\n  error: function error(_error) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(_error);\n  },\n  close: function close() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(\"Disconnected!\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"Close\");\n  }\n};\n\n/**\n * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL\n * @returns {string}\n */\nvar formatURL = function formatURL(objURL) {\n  var protocol = objURL.protocol || \"\";\n  if (protocol && protocol.substr(-1) !== \":\") {\n    protocol += \":\";\n  }\n  var auth = objURL.auth || \"\";\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, \":\");\n    auth += \"@\";\n  }\n  var host = \"\";\n  if (objURL.hostname) {\n    host = auth + (objURL.hostname.indexOf(\":\") === -1 ? objURL.hostname : \"[\".concat(objURL.hostname, \"]\"));\n    if (objURL.port) {\n      host += \":\".concat(objURL.port);\n    }\n  }\n  var pathname = objURL.pathname || \"\";\n  if (objURL.slashes) {\n    host = \"//\".concat(host || \"\");\n    if (pathname && pathname.charAt(0) !== \"/\") {\n      pathname = \"/\".concat(pathname);\n    }\n  } else if (!host) {\n    host = \"\";\n  }\n  var search = objURL.search || \"\";\n  if (search && search.charAt(0) !== \"?\") {\n    search = \"?\".concat(search);\n  }\n  var hash = objURL.hash || \"\";\n  if (hash && hash.charAt(0) !== \"#\") {\n    hash = \"#\".concat(hash);\n  }\n  pathname = pathname.replace(/[?#]/g,\n  /**\n   * @param {string} match\n   * @returns {string}\n   */\n  function (match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace(\"#\", \"%23\");\n  return \"\".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);\n};\n\n/**\n * @param {URL & { fromCurrentScript?: boolean }} parsedURL\n * @returns {string}\n */\nvar createSocketURL = function createSocketURL(parsedURL) {\n  var hostname = parsedURL.hostname;\n\n  // Node.js module parses it as `::`\n  // `new URL(urlString, [baseURLString])` parses it as '[::]'\n  var isInAddrAny = hostname === \"0.0.0.0\" || hostname === \"::\" || hostname === \"[::]\";\n\n  // why do we need this check?\n  // hostname n/a for file protocol (example, when using electron, ionic)\n  // see: https://github.com/webpack/webpack-dev-server/pull/384\n  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf(\"http\") === 0) {\n    hostname = self.location.hostname;\n  }\n  var socketURLProtocol = parsedURL.protocol || self.location.protocol;\n\n  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.\n  if (socketURLProtocol === \"auto:\" || hostname && isInAddrAny && self.location.protocol === \"https:\") {\n    socketURLProtocol = self.location.protocol;\n  }\n  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, \"ws\");\n  var socketURLAuth = \"\";\n\n  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property\n  // Parse authentication credentials in case we need them\n  if (parsedURL.username) {\n    socketURLAuth = parsedURL.username;\n\n    // Since HTTP basic authentication does not allow empty username,\n    // we only include password if the username is not empty.\n    if (parsedURL.password) {\n      // Result: <username>:<password>\n      socketURLAuth = socketURLAuth.concat(\":\", parsedURL.password);\n    }\n  }\n\n  // In case the host is a raw IPv6 address, it can be enclosed in\n  // the brackets as the brackets are needed in the final URL string.\n  // Need to remove those as url.format blindly adds its own set of brackets\n  // if the host string contains colons. That would lead to non-working\n  // double brackets (e.g. [[::]]) host\n  //\n  // All of these web socket url params are optionally passed in through resourceQuery,\n  // so we need to fall back to the default if they are not provided\n  var socketURLHostname = (hostname || self.location.hostname || \"localhost\").replace(/^\\[(.*)\\]$/, \"$1\");\n  var socketURLPort = parsedURL.port;\n  if (!socketURLPort || socketURLPort === \"0\") {\n    socketURLPort = self.location.port;\n  }\n\n  // If path is provided it'll be passed in via the resourceQuery as a\n  // query param so it has to be parsed out of the querystring in order for the\n  // client to open the socket to the correct location.\n  var socketURLPathname = \"/ws\";\n  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {\n    socketURLPathname = parsedURL.pathname;\n  }\n  return formatURL({\n    protocol: socketURLProtocol,\n    auth: socketURLAuth,\n    hostname: socketURLHostname,\n    port: socketURLPort,\n    pathname: socketURLPathname,\n    slashes: true\n  });\n};\nvar socketURL = createSocketURL(parsedResourceQuery);\n(0,_socket_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(socketURL, onSocketMessage, options.reconnect);\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/index.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{/******/ (function() { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./client-src/modules/logger/tapable.js\":\n/*!**********************************************!*\\\n  !*** ./client-src/modules/logger/tapable.js ***!\n  \\**********************************************/\n/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_372__) {\n\n__nested_webpack_require_372__.r(__nested_webpack_exports__);\n/* harmony export */ __nested_webpack_require_372__.d(__nested_webpack_exports__, {\n/* harmony export */   SyncBailHook: function() { return /* binding */ SyncBailHook; }\n/* harmony export */ });\nfunction SyncBailHook() {\n  return {\n    call: function call() {}\n  };\n}\n\n/**\n * Client stub for tapable SyncBailHook\n */\n// eslint-disable-next-line import/prefer-default-export\n\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/Logger.js\":\n/*!****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/Logger.js ***!\n  \\****************************************************/\n/***/ (function(module) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return _typeof = \"function\" == typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && \"symbol\" == typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && o.constructor === (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && o !== (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).prototype ? \"symbol\" : typeof o;\n  }, _typeof(o);\n}\nfunction _toConsumableArray(r) {\n  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();\n}\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _unsupportedIterableToArray(r, a) {\n  if (r) {\n    if (\"string\" == typeof r) return _arrayLikeToArray(r, a);\n    var t = {}.toString.call(r).slice(8, -1);\n    return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;\n  }\n}\nfunction _iterableToArray(r) {\n  if (\"undefined\" != typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && null != r[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] || null != r[\"@@iterator\"]) return Array.from(r);\n}\nfunction _arrayWithoutHoles(r) {\n  if (Array.isArray(r)) return _arrayLikeToArray(r);\n}\nfunction _arrayLikeToArray(r, a) {\n  (null == a || a > r.length) && (a = r.length);\n  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];\n  return n;\n}\nfunction _classCallCheck(a, n) {\n  if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\");\n}\nfunction _defineProperties(e, r) {\n  for (var t = 0; t < r.length; t++) {\n    var o = r[t];\n    o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);\n  }\n}\nfunction _createClass(e, r, t) {\n  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", {\n    writable: !1\n  }), e;\n}\nfunction _toPropertyKey(t) {\n  var i = _toPrimitive(t, \"string\");\n  return \"symbol\" == _typeof(i) ? i : i + \"\";\n}\nfunction _toPrimitive(t, r) {\n  if (\"object\" != _typeof(t) || !t) return t;\n  var e = t[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).toPrimitive];\n  if (void 0 !== e) {\n    var i = e.call(t, r || \"default\");\n    if (\"object\" != _typeof(i)) return i;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (\"string\" === r ? String : Number)(t);\n}\nvar LogType = Object.freeze({\n  error: (/** @type {\"error\"} */\"error\"),\n  // message, c style arguments\n  warn: (/** @type {\"warn\"} */\"warn\"),\n  // message, c style arguments\n  info: (/** @type {\"info\"} */\"info\"),\n  // message, c style arguments\n  log: (/** @type {\"log\"} */\"log\"),\n  // message, c style arguments\n  debug: (/** @type {\"debug\"} */\"debug\"),\n  // message, c style arguments\n\n  trace: (/** @type {\"trace\"} */\"trace\"),\n  // no arguments\n\n  group: (/** @type {\"group\"} */\"group\"),\n  // [label]\n  groupCollapsed: (/** @type {\"groupCollapsed\"} */\"groupCollapsed\"),\n  // [label]\n  groupEnd: (/** @type {\"groupEnd\"} */\"groupEnd\"),\n  // [label]\n\n  profile: (/** @type {\"profile\"} */\"profile\"),\n  // [profileName]\n  profileEnd: (/** @type {\"profileEnd\"} */\"profileEnd\"),\n  // [profileName]\n\n  time: (/** @type {\"time\"} */\"time\"),\n  // name, time as [seconds, nanoseconds]\n\n  clear: (/** @type {\"clear\"} */\"clear\"),\n  // no arguments\n  status: (/** @type {\"status\"} */\"status\") // message, arguments\n});\nmodule.exports.LogType = LogType;\n\n/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */\n\nvar LOG_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger raw log method\");\nvar TIMERS_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger times\");\nvar TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger aggregated times\");\nvar WebpackLogger = /*#__PURE__*/function () {\n  /**\n   * @param {(type: LogTypeEnum, args?: EXPECTED_ANY[]) => void} log log function\n   * @param {(name: string | (() => string)) => WebpackLogger} getChildLogger function to create child logger\n   */\n  function WebpackLogger(log, getChildLogger) {\n    _classCallCheck(this, WebpackLogger);\n    this[LOG_SYMBOL] = log;\n    this.getChildLogger = getChildLogger;\n  }\n\n  /**\n   * @param {...EXPECTED_ANY} args args\n   */\n  return _createClass(WebpackLogger, [{\n    key: \"error\",\n    value: function error() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n      this[LOG_SYMBOL](LogType.error, args);\n    }\n\n    /**\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"warn\",\n    value: function warn() {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n      this[LOG_SYMBOL](LogType.warn, args);\n    }\n\n    /**\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"info\",\n    value: function info() {\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n      this[LOG_SYMBOL](LogType.info, args);\n    }\n\n    /**\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"log\",\n    value: function log() {\n      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n        args[_key4] = arguments[_key4];\n      }\n      this[LOG_SYMBOL](LogType.log, args);\n    }\n\n    /**\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"debug\",\n    value: function debug() {\n      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {\n        args[_key5] = arguments[_key5];\n      }\n      this[LOG_SYMBOL](LogType.debug, args);\n    }\n\n    /**\n     * @param {EXPECTED_ANY} assertion assertion\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"assert\",\n    value: function assert(assertion) {\n      if (!assertion) {\n        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {\n          args[_key6 - 1] = arguments[_key6];\n        }\n        this[LOG_SYMBOL](LogType.error, args);\n      }\n    }\n  }, {\n    key: \"trace\",\n    value: function trace() {\n      this[LOG_SYMBOL](LogType.trace, [\"Trace\"]);\n    }\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      this[LOG_SYMBOL](LogType.clear);\n    }\n\n    /**\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"status\",\n    value: function status() {\n      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {\n        args[_key7] = arguments[_key7];\n      }\n      this[LOG_SYMBOL](LogType.status, args);\n    }\n\n    /**\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"group\",\n    value: function group() {\n      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {\n        args[_key8] = arguments[_key8];\n      }\n      this[LOG_SYMBOL](LogType.group, args);\n    }\n\n    /**\n     * @param {...EXPECTED_ANY} args args\n     */\n  }, {\n    key: \"groupCollapsed\",\n    value: function groupCollapsed() {\n      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {\n        args[_key9] = arguments[_key9];\n      }\n      this[LOG_SYMBOL](LogType.groupCollapsed, args);\n    }\n  }, {\n    key: \"groupEnd\",\n    value: function groupEnd() {\n      this[LOG_SYMBOL](LogType.groupEnd);\n    }\n\n    /**\n     * @param {string=} label label\n     */\n  }, {\n    key: \"profile\",\n    value: function profile(label) {\n      this[LOG_SYMBOL](LogType.profile, [label]);\n    }\n\n    /**\n     * @param {string=} label label\n     */\n  }, {\n    key: \"profileEnd\",\n    value: function profileEnd(label) {\n      this[LOG_SYMBOL](LogType.profileEnd, [label]);\n    }\n\n    /**\n     * @param {string} label label\n     */\n  }, {\n    key: \"time\",\n    value: function time(label) {\n      /** @type {Map<string | undefined, [number, number]>} */\n      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();\n      this[TIMERS_SYMBOL].set(label, process.hrtime());\n    }\n\n    /**\n     * @param {string=} label label\n     */\n  }, {\n    key: \"timeLog\",\n    value: function timeLog(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeLog()\"));\n      }\n      var time = process.hrtime(prev);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n\n    /**\n     * @param {string=} label label\n     */\n  }, {\n    key: \"timeEnd\",\n    value: function timeEnd(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeEnd()\"));\n      }\n      var time = process.hrtime(prev);\n      /** @type {Map<string | undefined, [number, number]>} */\n      this[TIMERS_SYMBOL].delete(label);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n\n    /**\n     * @param {string=} label label\n     */\n  }, {\n    key: \"timeAggregate\",\n    value: function timeAggregate(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeAggregate()\"));\n      }\n      var time = process.hrtime(prev);\n      /** @type {Map<string | undefined, [number, number]>} */\n      this[TIMERS_SYMBOL].delete(label);\n      /** @type {Map<string | undefined, [number, number]>} */\n      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();\n      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n      if (current !== undefined) {\n        if (time[1] + current[1] > 1e9) {\n          time[0] += current[0] + 1;\n          time[1] = time[1] - 1e9 + current[1];\n        } else {\n          time[0] += current[0];\n          time[1] += current[1];\n        }\n      }\n      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);\n    }\n\n    /**\n     * @param {string=} label label\n     */\n  }, {\n    key: \"timeAggregateEnd\",\n    value: function timeAggregateEnd(label) {\n      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;\n      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n      if (time === undefined) return;\n      this[TIMERS_AGGREGATES_SYMBOL].delete(label);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }]);\n}();\nmodule.exports.Logger = WebpackLogger;\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\":\n/*!*****************************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!\n  \\*****************************************************************/\n/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_12803__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _slicedToArray(r, e) {\n  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();\n}\nfunction _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _iterableToArrayLimit(r, l) {\n  var t = null == r ? null : \"undefined\" != typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && r[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] || r[\"@@iterator\"];\n  if (null != t) {\n    var e,\n      n,\n      i,\n      u,\n      a = [],\n      f = !0,\n      o = !1;\n    try {\n      if (i = (t = t.call(r)).next, 0 === l) {\n        if (Object(t) !== t) return;\n        f = !1;\n      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);\n    } catch (r) {\n      o = !0, n = r;\n    } finally {\n      try {\n        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;\n      } finally {\n        if (o) throw n;\n      }\n    }\n    return a;\n  }\n}\nfunction _arrayWithHoles(r) {\n  if (Array.isArray(r)) return r;\n}\nfunction _toConsumableArray(r) {\n  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();\n}\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _unsupportedIterableToArray(r, a) {\n  if (r) {\n    if (\"string\" == typeof r) return _arrayLikeToArray(r, a);\n    var t = {}.toString.call(r).slice(8, -1);\n    return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;\n  }\n}\nfunction _iterableToArray(r) {\n  if (\"undefined\" != typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && null != r[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] || null != r[\"@@iterator\"]) return Array.from(r);\n}\nfunction _arrayWithoutHoles(r) {\n  if (Array.isArray(r)) return _arrayLikeToArray(r);\n}\nfunction _arrayLikeToArray(r, a) {\n  (null == a || a > r.length) && (a = r.length);\n  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];\n  return n;\n}\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return _typeof = \"function\" == typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && \"symbol\" == typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && o.constructor === (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) && o !== (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).prototype ? \"symbol\" : typeof o;\n  }, _typeof(o);\n}\nvar _require = __nested_webpack_require_12803__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n  LogType = _require.LogType;\n\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterItemTypes} FilterItemTypes */\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterTypes} FilterTypes */\n/** @typedef {import(\"./Logger\").LogTypeEnum} LogTypeEnum */\n\n/** @typedef {(item: string) => boolean} FilterFunction */\n/** @typedef {(value: string, type: LogTypeEnum, args?: EXPECTED_ANY[]) => void} LoggingFunction */\n\n/**\n * @typedef {object} LoggerConsole\n * @property {() => void} clear\n * @property {() => void} trace\n * @property {(...args: EXPECTED_ANY[]) => void} info\n * @property {(...args: EXPECTED_ANY[]) => void} log\n * @property {(...args: EXPECTED_ANY[]) => void} warn\n * @property {(...args: EXPECTED_ANY[]) => void} error\n * @property {(...args: EXPECTED_ANY[]) => void=} debug\n * @property {(...args: EXPECTED_ANY[]) => void=} group\n * @property {(...args: EXPECTED_ANY[]) => void=} groupCollapsed\n * @property {(...args: EXPECTED_ANY[]) => void=} groupEnd\n * @property {(...args: EXPECTED_ANY[]) => void=} status\n * @property {(...args: EXPECTED_ANY[]) => void=} profile\n * @property {(...args: EXPECTED_ANY[]) => void=} profileEnd\n * @property {(...args: EXPECTED_ANY[]) => void=} logTime\n */\n\n/**\n * @typedef {object} LoggerOptions\n * @property {false|true|\"none\"|\"error\"|\"warn\"|\"info\"|\"log\"|\"verbose\"} level loglevel\n * @property {FilterTypes|boolean} debug filter for debug logging\n * @property {LoggerConsole} console the console to log to\n */\n\n/**\n * @param {FilterItemTypes} item an input item\n * @returns {FilterFunction | undefined} filter function\n */\nvar filterToFunction = function filterToFunction(item) {\n  if (typeof item === \"string\") {\n    var regExp = new RegExp(\"[\\\\\\\\/]\".concat(item.replace(/[-[\\]{}()*+?.\\\\^$|]/g, \"\\\\$&\"), \"([\\\\\\\\/]|$|!|\\\\?)\"));\n    return function (ident) {\n      return regExp.test(ident);\n    };\n  }\n  if (item && _typeof(item) === \"object\" && typeof item.test === \"function\") {\n    return function (ident) {\n      return item.test(ident);\n    };\n  }\n  if (typeof item === \"function\") {\n    return item;\n  }\n  if (typeof item === \"boolean\") {\n    return function () {\n      return item;\n    };\n  }\n};\n\n/**\n * @enum {number}\n */\nvar LogLevel = {\n  none: 6,\n  false: 6,\n  error: 5,\n  warn: 4,\n  info: 3,\n  log: 2,\n  true: 2,\n  verbose: 1\n};\n\n/**\n * @param {LoggerOptions} options options object\n * @returns {LoggingFunction} logging function\n */\nmodule.exports = function (_ref) {\n  var _ref$level = _ref.level,\n    level = _ref$level === void 0 ? \"info\" : _ref$level,\n    _ref$debug = _ref.debug,\n    debug = _ref$debug === void 0 ? false : _ref$debug,\n    console = _ref.console;\n  var debugFilters = /** @type {FilterFunction[]} */\n\n  typeof debug === \"boolean\" ? [function () {\n    return debug;\n  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);\n  var loglevel = LogLevel[\"\".concat(level)] || 0;\n\n  /**\n   * @param {string} name name of the logger\n   * @param {LogTypeEnum} type type of the log entry\n   * @param {EXPECTED_ANY[]=} args arguments of the log entry\n   * @returns {void}\n   */\n  var logger = function logger(name, type, args) {\n    var labeledArgs = function labeledArgs() {\n      if (Array.isArray(args)) {\n        if (args.length > 0 && typeof args[0] === \"string\") {\n          return [\"[\".concat(name, \"] \").concat(args[0])].concat(_toConsumableArray(args.slice(1)));\n        }\n        return [\"[\".concat(name, \"]\")].concat(_toConsumableArray(args));\n      }\n      return [];\n    };\n    var debug = debugFilters.some(function (f) {\n      return f(name);\n    });\n    switch (type) {\n      case LogType.debug:\n        if (!debug) return;\n        if (typeof console.debug === \"function\") {\n          console.debug.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.log:\n        if (!debug && loglevel > LogLevel.log) return;\n        console.log.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.info:\n        if (!debug && loglevel > LogLevel.info) return;\n        console.info.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.warn:\n        if (!debug && loglevel > LogLevel.warn) return;\n        console.warn.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.error:\n        if (!debug && loglevel > LogLevel.error) return;\n        console.error.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.trace:\n        if (!debug) return;\n        console.trace();\n        break;\n      case LogType.groupCollapsed:\n        if (!debug && loglevel > LogLevel.log) return;\n        if (!debug && loglevel > LogLevel.verbose) {\n          if (typeof console.groupCollapsed === \"function\") {\n            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));\n          } else {\n            console.log.apply(console, _toConsumableArray(labeledArgs()));\n          }\n          break;\n        }\n      // falls through\n      case LogType.group:\n        if (!debug && loglevel > LogLevel.log) return;\n        if (typeof console.group === \"function\") {\n          console.group.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.groupEnd:\n        if (!debug && loglevel > LogLevel.log) return;\n        if (typeof console.groupEnd === \"function\") {\n          console.groupEnd();\n        }\n        break;\n      case LogType.time:\n        {\n          if (!debug && loglevel > LogLevel.log) return;\n          var _args = _slicedToArray(/** @type {[string, number, number]} */\n            args, 3),\n            label = _args[0],\n            start = _args[1],\n            end = _args[2];\n          var ms = start * 1000 + end / 1000000;\n          var msg = \"[\".concat(name, \"] \").concat(label, \": \").concat(ms, \" ms\");\n          if (typeof console.logTime === \"function\") {\n            console.logTime(msg);\n          } else {\n            console.log(msg);\n          }\n          break;\n        }\n      case LogType.profile:\n        if (typeof console.profile === \"function\") {\n          console.profile.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.profileEnd:\n        if (typeof console.profileEnd === \"function\") {\n          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.clear:\n        if (!debug && loglevel > LogLevel.log) return;\n        if (typeof console.clear === \"function\") {\n          console.clear();\n        }\n        break;\n      case LogType.status:\n        if (!debug && loglevel > LogLevel.info) return;\n        if (typeof console.status === \"function\") {\n          if (!args || args.length === 0) {\n            console.status();\n          } else {\n            console.status.apply(console, _toConsumableArray(labeledArgs()));\n          }\n        } else if (args && args.length !== 0) {\n          console.info.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      default:\n        throw new Error(\"Unexpected LogType \".concat(type));\n    }\n  };\n  return logger;\n};\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/runtime.js\":\n/*!*****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/runtime.js ***!\n  \\*****************************************************/\n/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_23778__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _extends() {\n  return _extends = Object.assign ? Object.assign.bind() : function (n) {\n    for (var e = 1; e < arguments.length; e++) {\n      var t = arguments[e];\n      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);\n    }\n    return n;\n  }, _extends.apply(null, arguments);\n}\nvar _require = __nested_webpack_require_23778__(/*! tapable */ \"./client-src/modules/logger/tapable.js\"),\n  SyncBailHook = _require.SyncBailHook;\nvar _require2 = __nested_webpack_require_23778__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n  Logger = _require2.Logger;\nvar createConsoleLogger = __nested_webpack_require_23778__(/*! ./createConsoleLogger */ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\");\n\n/** @type {createConsoleLogger.LoggerOptions} */\nvar currentDefaultLoggerOptions = {\n  level: \"info\",\n  debug: false,\n  console: console\n};\nvar currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n\n/**\n * @param {string} name name of the logger\n * @returns {Logger} a logger\n */\nmodule.exports.getLogger = function (name) {\n  return new Logger(function (type, args) {\n    if (module.exports.hooks.log.call(name, type, args) === undefined) {\n      currentDefaultLogger(name, type, args);\n    }\n  }, function (childName) {\n    return module.exports.getLogger(\"\".concat(name, \"/\").concat(childName));\n  });\n};\n\n/**\n * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options\n * @returns {void}\n */\nmodule.exports.configureDefaultLogger = function (options) {\n  _extends(currentDefaultLoggerOptions, options);\n  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n};\nmodule.exports.hooks = {\n  log: new SyncBailHook([\"origin\", \"type\", \"args\"])\n};\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_25855__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_25855__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t!function() {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__nested_webpack_require_25855__.d = function(exports, definition) {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__nested_webpack_require_25855__.o(definition, key) && !__nested_webpack_require_25855__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t!function() {\n/******/ \t\t__nested_webpack_require_25855__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t!function() {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__nested_webpack_require_25855__.r = function(exports) {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/************************************************************************/\nvar __nested_webpack_exports__ = {};\n// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.\n!function() {\n/*!********************************************!*\\\n  !*** ./client-src/modules/logger/index.js ***!\n  \\********************************************/\n__nested_webpack_require_25855__.r(__nested_webpack_exports__);\n/* harmony export */ __nested_webpack_require_25855__.d(__nested_webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }\n/* harmony export */ });\n/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_25855__(/*! webpack/lib/logging/runtime.js */ \"./node_modules/webpack/lib/logging/runtime.js\");\n\n}();\nvar __webpack_export_target__ = exports;\nfor(var __webpack_i__ in __nested_webpack_exports__) __webpack_export_target__[__webpack_i__] = __nested_webpack_exports__[__webpack_i__];\nif(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, \"__esModule\", { value: true });\n/******/ })()\n;\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/modules/logger/index.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createOverlay: () => (/* binding */ createOverlay),\n/* harmony export */   formatProblem: () => (/* binding */ formatProblem)\n/* harmony export */ });\n/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ \"./node_modules/ansi-html-community/index.js\");\n/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)\n// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).\n\n\n\n/**\n * @type {(input: string, position: number) => string}\n */\nvar getCodePoint = String.prototype.codePointAt ? function (input, position) {\n  return input.codePointAt(position);\n} : function (input, position) {\n  return (input.charCodeAt(position) - 0xd800) * 0x400 + input.charCodeAt(position + 1) - 0xdc00 + 0x10000;\n};\n\n/**\n * @param {string} macroText\n * @param {RegExp} macroRegExp\n * @param {(input: string) => string} macroReplacer\n * @returns {string}\n */\nvar replaceUsingRegExp = function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {\n  macroRegExp.lastIndex = 0;\n  var replaceMatch = macroRegExp.exec(macroText);\n  var replaceResult;\n  if (replaceMatch) {\n    replaceResult = \"\";\n    var replaceLastIndex = 0;\n    do {\n      if (replaceLastIndex !== replaceMatch.index) {\n        replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index);\n      }\n      var replaceInput = replaceMatch[0];\n      replaceResult += macroReplacer(replaceInput);\n      replaceLastIndex = replaceMatch.index + replaceInput.length;\n      // eslint-disable-next-line no-cond-assign\n    } while (replaceMatch = macroRegExp.exec(macroText));\n    if (replaceLastIndex !== macroText.length) {\n      replaceResult += macroText.substring(replaceLastIndex);\n    }\n  } else {\n    replaceResult = macroText;\n  }\n  return replaceResult;\n};\nvar references = {\n  \"<\": \"&lt;\",\n  \">\": \"&gt;\",\n  '\"': \"&quot;\",\n  \"'\": \"&apos;\",\n  \"&\": \"&amp;\"\n};\n\n/**\n * @param {string} text text\n * @returns {string}\n */\nfunction encode(text) {\n  if (!text) {\n    return \"\";\n  }\n  return replaceUsingRegExp(text, /[<>'\"&]/g, function (input) {\n    var result = references[input];\n    if (!result) {\n      var code = input.length > 1 ? getCodePoint(input, 0) : input.charCodeAt(0);\n      result = \"&#\".concat(code, \";\");\n    }\n    return result;\n  });\n}\n\n/**\n * @typedef {Object} StateDefinitions\n * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]\n */\n\n/**\n * @typedef {Object} Options\n * @property {{[state: string]: StateDefinitions}} states\n * @property {object} context;\n * @property {string} initial\n */\n\n/**\n * @typedef {Object} Implementation\n * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions\n */\n\n/**\n * A simplified `createMachine` from `@xstate/fsm` with the following differences:\n *\n *  - the returned machine is technically a \"service\". No `interpret(machine).start()` is needed.\n *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.\n *  - event passed to `send` must be an object with `type` property.\n *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.\n *  Do not return anything if you just want to invoke side effect.\n *\n * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using\n * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.\n *\n * @param {Options} options\n * @param {Implementation} implementation\n */\nfunction createMachine(_ref, _ref2) {\n  var states = _ref.states,\n    context = _ref.context,\n    initial = _ref.initial;\n  var actions = _ref2.actions;\n  var currentState = initial;\n  var currentContext = context;\n  return {\n    send: function send(event) {\n      var currentStateOn = states[currentState].on;\n      var transitionConfig = currentStateOn && currentStateOn[event.type];\n      if (transitionConfig) {\n        currentState = transitionConfig.target;\n        if (transitionConfig.actions) {\n          transitionConfig.actions.forEach(function (actName) {\n            var actionImpl = actions[actName];\n            var nextContextValue = actionImpl && actionImpl(currentContext, event);\n            if (nextContextValue) {\n              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);\n            }\n          });\n        }\n      }\n    }\n  };\n}\n\n/**\n * @typedef {Object} ShowOverlayData\n * @property {'warning' | 'error'} level\n * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages\n * @property {'build' | 'runtime'} messageSource\n */\n\n/**\n * @typedef {Object} CreateOverlayMachineOptions\n * @property {(data: ShowOverlayData) => void} showOverlay\n * @property {() => void} hideOverlay\n */\n\n/**\n * @param {CreateOverlayMachineOptions} options\n */\nvar createOverlayMachine = function createOverlayMachine(options) {\n  var hideOverlay = options.hideOverlay,\n    showOverlay = options.showOverlay;\n  return createMachine({\n    initial: \"hidden\",\n    context: {\n      level: \"error\",\n      messages: [],\n      messageSource: \"build\"\n    },\n    states: {\n      hidden: {\n        on: {\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          },\n          RUNTIME_ERROR: {\n            target: \"displayRuntimeError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          }\n        }\n      },\n      displayBuildError: {\n        on: {\n          DISMISS: {\n            target: \"hidden\",\n            actions: [\"dismissMessages\", \"hideOverlay\"]\n          },\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"appendMessages\", \"showOverlay\"]\n          }\n        }\n      },\n      displayRuntimeError: {\n        on: {\n          DISMISS: {\n            target: \"hidden\",\n            actions: [\"dismissMessages\", \"hideOverlay\"]\n          },\n          RUNTIME_ERROR: {\n            target: \"displayRuntimeError\",\n            actions: [\"appendMessages\", \"showOverlay\"]\n          },\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          }\n        }\n      }\n    }\n  }, {\n    actions: {\n      dismissMessages: function dismissMessages() {\n        return {\n          messages: [],\n          level: \"error\",\n          messageSource: \"build\"\n        };\n      },\n      appendMessages: function appendMessages(context, event) {\n        return {\n          messages: context.messages.concat(event.messages),\n          level: event.level || context.level,\n          messageSource: event.type === \"RUNTIME_ERROR\" ? \"runtime\" : \"build\"\n        };\n      },\n      setMessages: function setMessages(context, event) {\n        return {\n          messages: event.messages,\n          level: event.level || context.level,\n          messageSource: event.type === \"RUNTIME_ERROR\" ? \"runtime\" : \"build\"\n        };\n      },\n      hideOverlay: hideOverlay,\n      showOverlay: showOverlay\n    }\n  });\n};\n\n/**\n *\n * @param {Error} error\n */\nvar parseErrorToStacks = function parseErrorToStacks(error) {\n  if (!error || !(error instanceof Error)) {\n    throw new Error(\"parseErrorToStacks expects Error object\");\n  }\n  if (typeof error.stack === \"string\") {\n    return error.stack.split(\"\\n\").filter(function (stack) {\n      return stack !== \"Error: \".concat(error.message);\n    });\n  }\n};\n\n/**\n * @callback ErrorCallback\n * @param {ErrorEvent} error\n * @returns {void}\n */\n\n/**\n * @param {ErrorCallback} callback\n */\nvar listenToRuntimeError = function listenToRuntimeError(callback) {\n  window.addEventListener(\"error\", callback);\n  return function cleanup() {\n    window.removeEventListener(\"error\", callback);\n  };\n};\n\n/**\n * @callback UnhandledRejectionCallback\n * @param {PromiseRejectionEvent} rejectionEvent\n * @returns {void}\n */\n\n/**\n * @param {UnhandledRejectionCallback} callback\n */\nvar listenToUnhandledRejection = function listenToUnhandledRejection(callback) {\n  window.addEventListener(\"unhandledrejection\", callback);\n  return function cleanup() {\n    window.removeEventListener(\"unhandledrejection\", callback);\n  };\n};\n\n// Styles are inspired by `react-error-overlay`\n\nvar msgStyles = {\n  error: {\n    backgroundColor: \"rgba(206, 17, 38, 0.1)\",\n    color: \"#fccfcf\"\n  },\n  warning: {\n    backgroundColor: \"rgba(251, 245, 180, 0.1)\",\n    color: \"#fbf5b4\"\n  }\n};\nvar iframeStyle = {\n  position: \"fixed\",\n  top: 0,\n  left: 0,\n  right: 0,\n  bottom: 0,\n  width: \"100vw\",\n  height: \"100vh\",\n  border: \"none\",\n  \"z-index\": 9999999999\n};\nvar containerStyle = {\n  position: \"fixed\",\n  boxSizing: \"border-box\",\n  left: 0,\n  top: 0,\n  right: 0,\n  bottom: 0,\n  width: \"100vw\",\n  height: \"100vh\",\n  fontSize: \"large\",\n  padding: \"2rem 2rem 4rem 2rem\",\n  lineHeight: \"1.2\",\n  whiteSpace: \"pre-wrap\",\n  overflow: \"auto\",\n  backgroundColor: \"rgba(0, 0, 0, 0.9)\",\n  color: \"white\"\n};\nvar headerStyle = {\n  color: \"#e83b46\",\n  fontSize: \"2em\",\n  whiteSpace: \"pre-wrap\",\n  fontFamily: \"sans-serif\",\n  margin: \"0 2rem 2rem 0\",\n  flex: \"0 0 auto\",\n  maxHeight: \"50%\",\n  overflow: \"auto\"\n};\nvar dismissButtonStyle = {\n  color: \"#ffffff\",\n  lineHeight: \"1rem\",\n  fontSize: \"1.5rem\",\n  padding: \"1rem\",\n  cursor: \"pointer\",\n  position: \"absolute\",\n  right: 0,\n  top: 0,\n  backgroundColor: \"transparent\",\n  border: \"none\"\n};\nvar msgTypeStyle = {\n  color: \"#e83b46\",\n  fontSize: \"1.2em\",\n  marginBottom: \"1rem\",\n  fontFamily: \"sans-serif\"\n};\nvar msgTextStyle = {\n  lineHeight: \"1.5\",\n  fontSize: \"1rem\",\n  fontFamily: \"Menlo, Consolas, monospace\"\n};\n\n// ANSI HTML\n\nvar colors = {\n  reset: [\"transparent\", \"transparent\"],\n  black: \"181818\",\n  red: \"E36049\",\n  green: \"B3CB74\",\n  yellow: \"FFD080\",\n  blue: \"7CAFC2\",\n  magenta: \"7FACCA\",\n  cyan: \"C3C2EF\",\n  lightgrey: \"EBE7E3\",\n  darkgrey: \"6D7891\"\n};\nansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);\n\n/**\n * @param {string} type\n * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item\n * @returns {{ header: string, body: string }}\n */\nvar formatProblem = function formatProblem(type, item) {\n  var header = type === \"warning\" ? \"WARNING\" : \"ERROR\";\n  var body = \"\";\n  if (typeof item === \"string\") {\n    body += item;\n  } else {\n    var file = item.file || \"\";\n    // eslint-disable-next-line no-nested-ternary\n    var moduleName = item.moduleName ? item.moduleName.indexOf(\"!\") !== -1 ? \"\".concat(item.moduleName.replace(/^(\\s|\\S)*!/, \"\"), \" (\").concat(item.moduleName, \")\") : \"\".concat(item.moduleName) : \"\";\n    var loc = item.loc;\n    header += \"\".concat(moduleName || file ? \" in \".concat(moduleName ? \"\".concat(moduleName).concat(file ? \" (\".concat(file, \")\") : \"\") : file).concat(loc ? \" \".concat(loc) : \"\") : \"\");\n    body += item.message || \"\";\n  }\n  if (Array.isArray(item.stack)) {\n    item.stack.forEach(function (stack) {\n      if (typeof stack === \"string\") {\n        body += \"\\r\\n\".concat(stack);\n      }\n    });\n  }\n  return {\n    header: header,\n    body: body\n  };\n};\n\n/**\n * @typedef {Object} CreateOverlayOptions\n * @property {string | null} trustedTypesPolicyName\n * @property {boolean | (error: Error) => void} [catchRuntimeError]\n */\n\n/**\n *\n * @param {CreateOverlayOptions} options\n */\nvar createOverlay = function createOverlay(options) {\n  /** @type {HTMLIFrameElement | null | undefined} */\n  var iframeContainerElement;\n  /** @type {HTMLDivElement | null | undefined} */\n  var containerElement;\n  /** @type {HTMLDivElement | null | undefined} */\n  var headerElement;\n  /** @type {Array<(element: HTMLDivElement) => void>} */\n  var onLoadQueue = [];\n  /** @type {TrustedTypePolicy | undefined} */\n  var overlayTrustedTypesPolicy;\n\n  /**\n   *\n   * @param {HTMLElement} element\n   * @param {CSSStyleDeclaration} style\n   */\n  function applyStyle(element, style) {\n    Object.keys(style).forEach(function (prop) {\n      element.style[prop] = style[prop];\n    });\n  }\n\n  /**\n   * @param {string | null} trustedTypesPolicyName\n   */\n  function createContainer(trustedTypesPolicyName) {\n    // Enable Trusted Types if they are available in the current browser.\n    if (window.trustedTypes) {\n      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || \"webpack-dev-server#overlay\", {\n        createHTML: function createHTML(value) {\n          return value;\n        }\n      });\n    }\n    iframeContainerElement = document.createElement(\"iframe\");\n    iframeContainerElement.id = \"webpack-dev-server-client-overlay\";\n    iframeContainerElement.src = \"about:blank\";\n    applyStyle(iframeContainerElement, iframeStyle);\n    iframeContainerElement.onload = function () {\n      var contentElement = /** @type {Document} */\n      (/** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument).createElement(\"div\");\n      containerElement = /** @type {Document} */\n      (/** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument).createElement(\"div\");\n      contentElement.id = \"webpack-dev-server-client-overlay-div\";\n      applyStyle(contentElement, containerStyle);\n      headerElement = document.createElement(\"div\");\n      headerElement.innerText = \"Compiled with problems:\";\n      applyStyle(headerElement, headerStyle);\n      var closeButtonElement = document.createElement(\"button\");\n      applyStyle(closeButtonElement, dismissButtonStyle);\n      closeButtonElement.innerText = \"×\";\n      closeButtonElement.ariaLabel = \"Dismiss\";\n      closeButtonElement.addEventListener(\"click\", function () {\n        // eslint-disable-next-line no-use-before-define\n        overlayService.send({\n          type: \"DISMISS\"\n        });\n      });\n      contentElement.appendChild(headerElement);\n      contentElement.appendChild(closeButtonElement);\n      contentElement.appendChild(containerElement);\n\n      /** @type {Document} */\n      (/** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument).body.appendChild(contentElement);\n      onLoadQueue.forEach(function (onLoad) {\n        onLoad(/** @type {HTMLDivElement} */contentElement);\n      });\n      onLoadQueue = [];\n\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.onload = null;\n    };\n    document.body.appendChild(iframeContainerElement);\n  }\n\n  /**\n   * @param {(element: HTMLDivElement) => void} callback\n   * @param {string | null} trustedTypesPolicyName\n   */\n  function ensureOverlayExists(callback, trustedTypesPolicyName) {\n    if (containerElement) {\n      containerElement.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(\"\") : \"\";\n      // Everything is ready, call the callback right away.\n      callback(containerElement);\n      return;\n    }\n    onLoadQueue.push(callback);\n    if (iframeContainerElement) {\n      return;\n    }\n    createContainer(trustedTypesPolicyName);\n  }\n\n  // Successful compilation.\n  function hide() {\n    if (!iframeContainerElement) {\n      return;\n    }\n\n    // Clean up and reset internal state.\n    document.body.removeChild(iframeContainerElement);\n    iframeContainerElement = null;\n    containerElement = null;\n  }\n\n  // Compilation with errors (e.g. syntax error or missing modules).\n  /**\n   * @param {string} type\n   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages\n   * @param {string | null} trustedTypesPolicyName\n   * @param {'build' | 'runtime'} messageSource\n   */\n  function show(type, messages, trustedTypesPolicyName, messageSource) {\n    ensureOverlayExists(function () {\n      headerElement.innerText = messageSource === \"runtime\" ? \"Uncaught runtime errors:\" : \"Compiled with problems:\";\n      messages.forEach(function (message) {\n        var entryElement = document.createElement(\"div\");\n        var msgStyle = type === \"warning\" ? msgStyles.warning : msgStyles.error;\n        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {\n          padding: \"1rem 1rem 1.5rem 1rem\"\n        }));\n        var typeElement = document.createElement(\"div\");\n        var _formatProblem = formatProblem(type, message),\n          header = _formatProblem.header,\n          body = _formatProblem.body;\n        typeElement.innerText = header;\n        applyStyle(typeElement, msgTypeStyle);\n        if (message.moduleIdentifier) {\n          applyStyle(typeElement, {\n            cursor: \"pointer\"\n          });\n          // element.dataset not supported in IE\n          typeElement.setAttribute(\"data-can-open\", true);\n          typeElement.addEventListener(\"click\", function () {\n            fetch(\"/webpack-dev-server/open-editor?fileName=\".concat(message.moduleIdentifier));\n          });\n        }\n\n        // Make it look similar to our terminal.\n        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()(encode(body));\n        var messageTextNode = document.createElement(\"div\");\n        applyStyle(messageTextNode, msgTextStyle);\n        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;\n        entryElement.appendChild(typeElement);\n        entryElement.appendChild(messageTextNode);\n\n        /** @type {HTMLDivElement} */\n        containerElement.appendChild(entryElement);\n      });\n    }, trustedTypesPolicyName);\n  }\n  var overlayService = createOverlayMachine({\n    showOverlay: function showOverlay(_ref3) {\n      var _ref3$level = _ref3.level,\n        level = _ref3$level === void 0 ? \"error\" : _ref3$level,\n        messages = _ref3.messages,\n        messageSource = _ref3.messageSource;\n      return show(level, messages, options.trustedTypesPolicyName, messageSource);\n    },\n    hideOverlay: hide\n  });\n  if (options.catchRuntimeError) {\n    /**\n     * @param {Error | undefined} error\n     * @param {string} fallbackMessage\n     */\n    var handleError = function handleError(error, fallbackMessage) {\n      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);\n      var shouldDisplay = typeof options.catchRuntimeError === \"function\" ? options.catchRuntimeError(errorObject) : true;\n      if (shouldDisplay) {\n        overlayService.send({\n          type: \"RUNTIME_ERROR\",\n          messages: [{\n            message: errorObject.message,\n            stack: parseErrorToStacks(errorObject)\n          }]\n        });\n      }\n    };\n    listenToRuntimeError(function (errorEvent) {\n      // error property may be empty in older browser like IE\n      var error = errorEvent.error,\n        message = errorEvent.message;\n      if (!error && !message) {\n        return;\n      }\n\n      // if error stack indicates a React error boundary caught the error, do not show overlay.\n      if (error && error.stack && error.stack.includes(\"invokeGuardedCallbackDev\")) {\n        return;\n      }\n      handleError(error, message);\n    });\n    listenToUnhandledRejection(function (promiseRejectionEvent) {\n      var reason = promiseRejectionEvent.reason;\n      handleError(reason, \"Unknown promise rejection reason\");\n    });\n  }\n  return overlayService;\n};\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/overlay.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/progress.js":
/*!************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/progress.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   defineProgressElement: () => (/* binding */ defineProgressElement),\n/* harmony export */   isProgressSupported: () => (/* binding */ isProgressSupported)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }\nfunction _possibleConstructorReturn(t, e) { if (e && (\"object\" == _typeof(e) || \"function\" == typeof e)) return e; if (void 0 !== e) throw new TypeError(\"Derived constructors may only return object or undefined\"); return _assertThisInitialized(t); }\nfunction _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); return e; }\nfunction _inherits(t, e) { if (\"function\" != typeof e && null !== e) throw new TypeError(\"Super expression must either be null or a function\"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, \"prototype\", { writable: !1 }), e && _setPrototypeOf(t, e); }\nfunction _wrapNativeSuper(t) { var r = \"function\" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if (\"function\" != typeof t) throw new TypeError(\"Super expression must either be null or a function\"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }\nfunction _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }\nfunction _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }\nfunction _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf(\"[native code]\"); } catch (n) { return \"function\" == typeof t; } }\nfunction _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }\nfunction _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }\nfunction _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }\nfunction _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError(\"Cannot initialize the same private elements twice on an object\"); }\nfunction _assertClassBrand(e, t, n) { if (\"function\" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError(\"Private element is not present on this object\"); }\nfunction isProgressSupported() {\n  return \"customElements\" in self && !!HTMLElement.prototype.attachShadow;\n}\nfunction defineProgressElement() {\n  var _WebpackDevServerProgress;\n  if (customElements.get(\"wds-progress\")) {\n    return;\n  }\n  var _WebpackDevServerProgress_brand = /*#__PURE__*/new WeakSet();\n  var WebpackDevServerProgress = /*#__PURE__*/function (_HTMLElement) {\n    function WebpackDevServerProgress() {\n      var _this;\n      _classCallCheck(this, WebpackDevServerProgress);\n      _this = _callSuper(this, WebpackDevServerProgress);\n      _classPrivateMethodInitSpec(_this, _WebpackDevServerProgress_brand);\n      _this.attachShadow({\n        mode: \"open\"\n      });\n      _this.maxDashOffset = -219.99078369140625;\n      _this.animationTimer = null;\n      return _this;\n    }\n    _inherits(WebpackDevServerProgress, _HTMLElement);\n    return _createClass(WebpackDevServerProgress, [{\n      key: \"connectedCallback\",\n      value: function connectedCallback() {\n        _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);\n      }\n    }, {\n      key: \"attributeChangedCallback\",\n      value: function attributeChangedCallback(name, oldValue, newValue) {\n        if (name === \"progress\") {\n          _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, Number(newValue));\n        } else if (name === \"type\") {\n          _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);\n        }\n      }\n    }], [{\n      key: \"observedAttributes\",\n      get: function get() {\n        return [\"progress\", \"type\"];\n      }\n    }]);\n  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));\n  _WebpackDevServerProgress = WebpackDevServerProgress;\n  function _reset() {\n    var _this$getAttribute, _Number;\n    clearTimeout(this.animationTimer);\n    this.animationTimer = null;\n    var typeAttr = (_this$getAttribute = this.getAttribute(\"type\")) === null || _this$getAttribute === void 0 ? void 0 : _this$getAttribute.toLowerCase();\n    this.type = typeAttr === \"circular\" ? \"circular\" : \"linear\";\n    var innerHTML = this.type === \"circular\" ? _circularTemplate.call(_WebpackDevServerProgress) : _linearTemplate.call(_WebpackDevServerProgress);\n    this.shadowRoot.innerHTML = innerHTML;\n    this.initialProgress = (_Number = Number(this.getAttribute(\"progress\"))) !== null && _Number !== void 0 ? _Number : 0;\n    _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, this.initialProgress);\n  }\n  function _circularTemplate() {\n    return \"\\n        <style>\\n        :host {\\n            width: 200px;\\n            height: 200px;\\n            position: fixed;\\n            right: 5%;\\n            top: 5%;\\n            transition: opacity .25s ease-in-out;\\n            z-index: 2147483645;\\n        }\\n\\n        circle {\\n            fill: #282d35;\\n        }\\n\\n        path {\\n            fill: rgba(0, 0, 0, 0);\\n            stroke: rgb(186, 223, 172);\\n            stroke-dasharray: 219.99078369140625;\\n            stroke-dashoffset: -219.99078369140625;\\n            stroke-width: 10;\\n            transform: rotate(90deg) translate(0px, -80px);\\n        }\\n\\n        text {\\n            font-family: 'Open Sans', sans-serif;\\n            font-size: 18px;\\n            fill: #ffffff;\\n            dominant-baseline: middle;\\n            text-anchor: middle;\\n        }\\n\\n        tspan#percent-super {\\n            fill: #bdc3c7;\\n            font-size: 0.45em;\\n            baseline-shift: 10%;\\n        }\\n\\n        @keyframes fade {\\n            0% { opacity: 1; transform: scale(1); }\\n            100% { opacity: 0; transform: scale(0); }\\n        }\\n\\n        .disappear {\\n            animation: fade 0.3s;\\n            animation-fill-mode: forwards;\\n            animation-delay: 0.5s;\\n        }\\n\\n        .hidden {\\n            display: none;\\n        }\\n        </style>\\n        <svg id=\\\"progress\\\" class=\\\"hidden noselect\\\" viewBox=\\\"0 0 80 80\\\">\\n        <circle cx=\\\"50%\\\" cy=\\\"50%\\\" r=\\\"35\\\"></circle>\\n        <path d=\\\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\\\"></path>\\n        <text x=\\\"50%\\\" y=\\\"51%\\\">\\n            <tspan id=\\\"percent-value\\\">0</tspan>\\n            <tspan id=\\\"percent-super\\\">%</tspan>\\n        </text>\\n        </svg>\\n      \";\n  }\n  function _linearTemplate() {\n    return \"\\n        <style>\\n        :host {\\n            position: fixed;\\n            top: 0;\\n            left: 0;\\n            height: 4px;\\n            width: 100vw;\\n            z-index: 2147483645;\\n        }\\n\\n        #bar {\\n            width: 0%;\\n            height: 4px;\\n            background-color: rgb(186, 223, 172);\\n        }\\n\\n        @keyframes fade {\\n            0% { opacity: 1; }\\n            100% { opacity: 0; }\\n        }\\n\\n        .disappear {\\n            animation: fade 0.3s;\\n            animation-fill-mode: forwards;\\n            animation-delay: 0.5s;\\n        }\\n\\n        .hidden {\\n            display: none;\\n        }\\n        </style>\\n        <div id=\\\"progress\\\"></div>\\n        \";\n  }\n  function _update(percent) {\n    var element = this.shadowRoot.querySelector(\"#progress\");\n    if (this.type === \"circular\") {\n      var path = this.shadowRoot.querySelector(\"path\");\n      var value = this.shadowRoot.querySelector(\"#percent-value\");\n      var offset = (100 - percent) / 100 * this.maxDashOffset;\n      path.style.strokeDashoffset = offset;\n      value.textContent = percent;\n    } else {\n      element.style.width = \"\".concat(percent, \"%\");\n    }\n    if (percent >= 100) {\n      _assertClassBrand(_WebpackDevServerProgress_brand, this, _hide).call(this);\n    } else if (percent > 0) {\n      _assertClassBrand(_WebpackDevServerProgress_brand, this, _show).call(this);\n    }\n  }\n  function _show() {\n    var element = this.shadowRoot.querySelector(\"#progress\");\n    element.classList.remove(\"hidden\");\n  }\n  function _hide() {\n    var _this2 = this;\n    var element = this.shadowRoot.querySelector(\"#progress\");\n    if (this.type === \"circular\") {\n      element.classList.add(\"disappear\");\n      element.addEventListener(\"animationend\", function () {\n        element.classList.add(\"hidden\");\n        _assertClassBrand(_WebpackDevServerProgress_brand, _this2, _update).call(_this2, 0);\n      }, {\n        once: true\n      });\n    } else if (this.type === \"linear\") {\n      element.classList.add(\"disappear\");\n      this.animationTimer = setTimeout(function () {\n        element.classList.remove(\"disappear\");\n        element.classList.add(\"hidden\");\n        element.style.width = \"0%\";\n        _this2.animationTimer = null;\n      }, 800);\n    }\n  }\n  customElements.define(\"wds-progress\", WebpackDevServerProgress);\n}\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/progress.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   client: () => (/* binding */ client),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* global __webpack_dev_server_client__ */\n\n\n\n\n// this WebsocketClient is here as a default fallback, in case the client is not injected\n/* eslint-disable camelcase */\nvar Client =\n// eslint-disable-next-line no-nested-ternary\ntypeof __webpack_dev_server_client__ !== \"undefined\" ? typeof __webpack_dev_server_client__.default !== \"undefined\" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n/* eslint-enable camelcase */\n\nvar retries = 0;\nvar maxRetries = 10;\n\n// Initialized client is exported so external consumers can utilize the same instance\n// It is mutable to enforce singleton\n// eslint-disable-next-line import/no-mutable-exports\nvar client = null;\nvar timeout;\n\n/**\n * @param {string} url\n * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers\n * @param {number} [reconnect]\n */\nvar socket = function initSocket(url, handlers, reconnect) {\n  client = new Client(url);\n  client.onOpen(function () {\n    retries = 0;\n    if (timeout) {\n      clearTimeout(timeout);\n    }\n    if (typeof reconnect !== \"undefined\") {\n      maxRetries = reconnect;\n    }\n  });\n  client.onClose(function () {\n    if (retries === 0) {\n      handlers.close();\n    }\n\n    // Try to reconnect.\n    client = null;\n\n    // After 10 retries stop trying, to prevent logspam.\n    if (retries < maxRetries) {\n      // Exponentially increase timeout to reconnect.\n      // Respectfully copied from the package `got`.\n      // eslint-disable-next-line no-restricted-properties\n      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;\n      retries += 1;\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"Trying to reconnect...\");\n      timeout = setTimeout(function () {\n        socket(url, handlers, reconnect);\n      }, retryInMs);\n    }\n  });\n  client.onMessage(\n  /**\n   * @param {any} data\n   */\n  function (data) {\n    var message = JSON.parse(data);\n    if (handlers[message.type]) {\n      handlers[message.type](message.data, message.params);\n    }\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/socket.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   log: () => (/* binding */ log),\n/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)\n/* harmony export */ });\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ \"./node_modules/webpack-dev-server/client/modules/logger/index.js\");\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar name = \"webpack-dev-server\";\n// default level is set on the client side, so it does not need\n// to be set by the CLI or API\nvar defaultLevel = \"info\";\n\n// options new options, merge with old options\n/**\n * @param {false | true | \"none\" | \"error\" | \"warn\" | \"info\" | \"log\" | \"verbose\"} level\n * @returns {void}\n */\nfunction setLogLevel(level) {\n  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({\n    level: level\n  });\n}\nsetLogLevel(defaultLevel);\nvar log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/utils/log.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* global __resourceQuery WorkerGlobalScope */\n\n// Send messages to the outside, so plugins can consume it.\n/**\n * @param {string} type\n * @param {any} [data]\n */\nfunction sendMsg(type, data) {\n  if (typeof self !== \"undefined\" && (typeof WorkerGlobalScope === \"undefined\" || !(self instanceof WorkerGlobalScope))) {\n    self.postMessage({\n      type: \"webpack\".concat(type),\n      data: data\n    }, \"*\");\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack-dev-server/client/utils/sendMessage.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/* globals __webpack_hash__ */\nif (true) {\n\t/** @type {undefined|string} */\n\tvar lastHash;\n\tvar upToDate = function upToDate() {\n\t\treturn /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;\n\t};\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\tvar check = function check() {\n\t\tmodule.hot\n\t\t\t.check(true)\n\t\t\t.then(function (updatedModules) {\n\t\t\t\tif (!updatedModules) {\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] Cannot find update. \" +\n\t\t\t\t\t\t\t(typeof window !== \"undefined\"\n\t\t\t\t\t\t\t\t? \"Need to do a full reload!\"\n\t\t\t\t\t\t\t\t: \"Please reload manually!\")\n\t\t\t\t\t);\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] (Probably because of restarting the webpack-dev-server)\"\n\t\t\t\t\t);\n\t\t\t\t\tif (typeof window !== \"undefined\") {\n\t\t\t\t\t\twindow.location.reload();\n\t\t\t\t\t}\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (!upToDate()) {\n\t\t\t\t\tcheck();\n\t\t\t\t}\n\n\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n\t\t\t\tif (upToDate()) {\n\t\t\t\t\tlog(\"info\", \"[HMR] App is up to date.\");\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(function (err) {\n\t\t\t\tvar status = module.hot.status();\n\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] Cannot apply update. \" +\n\t\t\t\t\t\t\t(typeof window !== \"undefined\"\n\t\t\t\t\t\t\t\t? \"Need to do a full reload!\"\n\t\t\t\t\t\t\t\t: \"Please reload manually!\")\n\t\t\t\t\t);\n\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\tif (typeof window !== \"undefined\") {\n\t\t\t\t\t\twindow.location.reload();\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t}\n\t\t\t});\n\t};\n\tvar hotEmitter = __webpack_require__(/*! ./emitter */ \"./node_modules/webpack/hot/emitter.js\");\n\thotEmitter.on(\"webpackHotUpdate\", function (currentHash) {\n\t\tlastHash = currentHash;\n\t\tif (!upToDate() && module.hot.status() === \"idle\") {\n\t\t\tlog(\"info\", \"[HMR] Checking for updates on the server...\");\n\t\t\tcheck();\n\t\t}\n\t});\n\tlog(\"info\", \"[HMR] Waiting for update signal from WDS...\");\n} else // removed by dead control flow\n{}\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack/hot/dev-server.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{var EventEmitter = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\nmodule.exports = new EventEmitter();\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack/hot/emitter.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n/**\n * @param {(string | number)[]} updatedModules updated modules\n * @param {(string | number)[] | null} renewedModules renewed modules\n */\nmodule.exports = function (updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function (moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function (moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function (moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function (moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t'[HMR] Consider using the optimization.moduleIds: \"named\" for module names.'\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack/hot/log-apply-result.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

eval("{/** @typedef {\"info\" | \"warning\" | \"error\"} LogLevel */\n\n/** @type {LogLevel} */\nvar logLevel = \"info\";\n\nfunction dummy() {}\n\n/**\n * @param {LogLevel} level log level\n * @returns {boolean} true, if should log\n */\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\n/**\n * @param {(msg?: string) => void} logFn log function\n * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient\n */\nfunction logGroup(logFn) {\n\treturn function (level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\n/**\n * @param {LogLevel} level log level\n * @param {string|Error} msg message\n */\nmodule.exports = function (level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/**\n * @param {Error} err error\n * @returns {string} formatted error\n */\nmodule.exports.formatError = function (err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t}\n\treturn stack;\n};\n\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\n/**\n * @param {LogLevel} level log level\n */\nmodule.exports.setLogLevel = function (level) {\n\tlogLevel = level;\n};\n\n\n//# sourceURL=webpack://InspectorToolbar/./node_modules/webpack/hot/log.js?\n}");

/***/ }),

/***/ "./src/index-shadow.js":
/*!*****************************!*\
  !*** ./src/index-shadow.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shadow_styles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shadow-styles.js */ \"./src/shadow-styles.js\");\n\n\nclass InspectorToolbar {\n  _getEvents() {\n    const events = this.options.events;\n    if (Array.isArray(events)) {\n      return events;\n    }\n    return [];\n  }\n\n  constructor(options = {}) {\n    this.options = {\n      apiUrl: null,\n      token: null,\n      debug: false,\n      position: 'bottom',\n      height: '60px',\n      backgroundColor: '#ffffff',\n      textColor: '#1e293b',\n      ...options\n    };\n    \n    this.toolbarHost = null;\n    this.shadowRoot = null;\n    this.toolbar = null;\n    this.isVisible = false;\n    this.isInspecting = false;\n    this.highlighter = null;\n    this.tooltip = null;\n    this.currentStep = 1;\n    this.totalSteps = 3;\n    this.selectorCount = 1;\n    this.attributeCount = 1;\n    this.completedSteps = [];\n    this.categoriesData = null;\n    this.rawCategoriesData = null;\n    this.collapsed = true;\n  }\n\n  init() {\n    this.createToolbarHost();\n    this.createToolbar();\n    this.attachToPage();\n    this.createInspectorElements();\n    this.showConstantEvents();\n    this.fetchCategories();\n    return this;\n  }\n\n  createToolbarHost() {\n    // Create a host element for the Shadow DOM\n    this.toolbarHost = document.createElement('div');\n    this.toolbarHost.id = 'inspector-toolbar-host';\n    this.toolbarHost.style.cssText = `\n      position: fixed;\n      left: 50%;\n      transform: translateX(-50%);\n      bottom: 50px;\n      z-index: 9999;\n      pointer-events: auto;\n    `;\n    \n    // Create Shadow DOM\n    this.shadowRoot = this.toolbarHost.attachShadow({ mode: 'open' });\n  }\n\n  createToolbar() {\n    // Inject styles into Shadow DOM\n    const styleSheet = document.createElement('style');\n    styleSheet.textContent = (0,_shadow_styles_js__WEBPACK_IMPORTED_MODULE_0__.getShadowStyles)();\n    this.shadowRoot.appendChild(styleSheet);\n\n    // Create toolbar structure inside Shadow DOM\n    const toolbarWrapper = document.createElement('div');\n    toolbarWrapper.className = 'inspector-toolbar-wrapper collapsed';\n    toolbarWrapper.innerHTML = `\n      <div class=\"inspector-toolbar-content\">\n        <div class=\"toolbar-left\">\n          <div class=\"toolbar-logo\">\n            Event Builder\n          </div>\n        </div>\n        <div class=\"toolbar-right\">\n          <button class=\"inspector-toolbar-collapse\">\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <polyline points=\"6,9 12,15 18,9\"></polyline>\n            </svg>\n          </button>\n        </div>\n      </div>\n      <div class=\"custom-event-form-container collapsed\">\n        <form id=\"custom-event-form\">\n          <div class=\"stepper-container\">\n            <div class=\"stepper-header\">\n              <div class=\"stepper-title\">Event Builder</div>\n            </div>\n            \n            <div class=\"stepper-progress\">\n              <div class=\"stepper-step active\" data-step=\"1\">\n                <div class=\"step-number\">1</div>\n                <div class=\"step-label\">Event Info</div>\n              </div>\n              <div class=\"stepper-connector\"></div>\n              <div class=\"stepper-step\" data-step=\"2\">\n                <div class=\"step-number\">2</div>\n                <div class=\"step-label\">Selectors</div>\n              </div>\n              <div class=\"stepper-connector\"></div>\n              <div class=\"stepper-step\" data-step=\"3\">\n                <div class=\"step-number\">3</div>\n                <div class=\"step-label\">Attributes</div>\n              </div>\n            </div>\n\n            <div class=\"stepper-content\">\n              <!-- Step 1: Event Info -->\n              <div class=\"step-content active\" data-step=\"1\">\n                <div class=\"form-group-row\">\n                  <label>Type</label>\n                  <div class=\"type-selector\">\n                    <button type=\"button\" class=\"type-option active\" data-type=\"key\">Key</button>\n                    <button type=\"button\" class=\"type-option\" data-type=\"general\">General</button>\n                  </div>\n                </div>\n                \n               \n                <div class=\"form-group-row-split\">\n                  <div class=\"form-group-half\">\n                    <label for=\"event-category\">Category</label>\n                    <select id=\"event-category\" name=\"category\" required>\n                      <option value=\"\">Loading...</option>\n                    </select>\n                  </div>\n                  <div class=\"form-group-half\">\n                    <label for=\"event-type\">Event</label>\n                    <select id=\"event-type\" name=\"eventType\" required>\n                      <option value=\"\">Please select a category</option>\n                    </select>\n                  </div>\n                </div>\n                \n                <div class=\"form-group-row-split\">\n                  <div class=\"form-group-half\">\n                    <label for=\"event-trigger\">Event Trigger</label>\n                    <select id=\"event-trigger\" name=\"eventTrigger\" required>\n                      <option value=\"click\"> Click</option>\n                      <option value=\"pageview\">Page View</option>\n                      <option value=\"visibility_change\">Visible on screen</option>\n                    </select>\n                  </div>\n                  <div class=\"form-group-half\">\n                    <label for=\"count-type\">Count Type</label>\n                    <select id=\"count-type\" name=\"countType\" required>\n                      <option value=\"per_event\">Per Event</option>\n                      <option value=\"once_per_session\">Once per session</option>\n                      <option value=\"once_per_page\">Once per page</option>\n                    </select>\n                  </div>\n                </div>\n              </div>\n              \n              <!-- Step 2: Selectors -->\n              <div class=\"step-content\" data-step=\"2\">\n                <div id=\"selectors-container\">\n                  <!-- Selector 1 -->\n                  <div class=\"selector-block\" data-selector-id=\"1\">\n                    <div class=\"selector-header\">\n                      <h3 class=\"selector-title\">Selector 1</h3>\n                      <button type=\"button\" class=\"remove-selector-btn remove-selector-btn-hide\" title=\"Remove Selector\">\n                        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                          <polyline points=\"3 6 5 6 21 6\"></polyline>\n                          <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n                        </svg>\n                      </button>\n                    </div>\n                    \n                    <div class=\"form-group-row\">\n                      <label>Element Selector</label>\n                      <div class=\"input-with-icon\">\n                        <input type=\"text\" name=\"elementSelector[]\" placeholder=\"#add_to_cart\" required>\n                        <button type=\"button\" class=\"selector-inspect-btn toolbar-button icon-button\" title=\"Inspect Element\">\n                          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-crosshair\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line><line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line><line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line></svg>\n                        </button>\n                      </div>\n                    </div>\n                    \n                    <div class=\"form-group-row\">\n                      <label>Page Pattern (Optional)</label>\n                      <div class=\"page-pattern-container\">\n                        <div class=\"pattern-operator\">\n                          <select name=\"patternOperator[]\" class=\"pattern-operator-select border-none\">\n                            <option value=\"equals\">Equals</option>\n                            <option value=\"contains\">Contains</option>\n                            <option value=\"starts_with\">Starts with</option>\n                            <option value=\"ends_with\">Ends with</option>\n                          </select>\n                        </div>\n                        <input type=\"text\" name=\"patternValue[]\" class=\"pattern-value border-none\" placeholder=\"Value\">\n                      </div>\n                    </div>\n                  </div>\n                  \n                  <!-- Add Selector Button -->\n                  <button type=\"button\" id=\"add-selector-btn\" class=\"add-selector-btn\">\n                    <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                      <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n                      <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n                    </svg>\n                    Add New\n                  </button>\n                </div>\n              </div>\n              \n              <!-- Step 3: Attributes -->\n              <div class=\"step-content\" data-step=\"3\">\n                <div id=\"attributes-container\">\n                  <!-- Attribute 1 -->\n                  <div class=\"attribute-block\" data-attribute-id=\"1\">\n                    <div class=\"attribute-header\">\n                      <h3 class=\"attribute-title\">Attribute 1 (Optional)</h3>\n                      <button type=\"button\" class=\"remove-attribute-btn remove-attribute-btn-hide\" title=\"Remove Attribute\">\n                        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                          <polyline points=\"3 6 5 6 21 6\"></polyline>\n                          <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n                        </svg>\n                      </button>\n                    </div>\n                    \n                    <div class=\"attribute-fields\">\n                      <div class=\"attribute-name-field\">\n                        <select name=\"attributeName[]\" class=\"attribute-name-select\">\n                          <option value=\"\">Select Name</option>\n                          <option value=\"id\">ID</option>\n                          <option value=\"class\">Class</option>\n                          <option value=\"data-value\">Data Value</option>\n                          <option value=\"text\">Text Content</option>\n                          <option value=\"href\">Link (href)</option>\n                          <option value=\"src\">Image Source</option>\n                          <option value=\"alt\">Alt Text</option>\n                          <option value=\"title\">Title</option>\n                          <option value=\"custom\">Custom</option>\n                        </select>\n                      </div>\n                      \n                      <div class=\"attribute-value-field\">\n                        <div class=\"input-with-icon\">\n                          <input type=\"text\" name=\"attributeValue[]\" placeholder=\"Like &#34;#sale.price&#34;\">\n                          <button type=\"button\" class=\"inspect-attribute-btn toolbar-button icon-button\" title=\"Inspect Element\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-crosshair\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line><line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line><line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line></svg>\n                          </button>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  \n                  <!-- Add Attribute Button -->\n                  <button type=\"button\" id=\"add-attribute-btn\" class=\"add-attribute-btn\">\n                    <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                      <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n                      <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n                    </svg>\n                    Add New\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n\n        <div class=\"form-actions\">\n          <button type=\"button\" id=\"prev-step-btn\" class=\"secondary-btn\">\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <polyline points=\"15 18 9 12 15 6\"></polyline>\n            </svg>\n            Previous\n          </button>\n          <button type=\"button\" id=\"next-step-btn\">\n            Next\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <polyline points=\"9 18 15 12 9 6\"></polyline>\n            </svg>\n          </button>\n        </div>\n      </div>\n    `;\n\n    this.shadowRoot.appendChild(toolbarWrapper);\n    this.toolbar = toolbarWrapper;\n    \n    this.bindEvents();\n  }\n\n  // Helper method to query elements in Shadow DOM\n  $(selector) {\n    return this.shadowRoot.querySelector(selector);\n  }\n\n  $$(selector) {\n    return this.shadowRoot.querySelectorAll(selector);\n  }\n\n  createInspectorElements() {\n    // These elements need to be in the main DOM for inspection\n    this.highlighter = document.createElement('div');\n    this.highlighter.style.cssText = `\n      position: absolute;\n      background-color: rgba(59, 130, 246, 0.15);\n      border: 2px solid #3b82f6;\n      border-radius: 4px;\n      z-index: 9998;\n      display: none;\n      pointer-events: none;\n      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1);\n    `;\n    document.body.appendChild(this.highlighter);\n\n    this.tooltip = document.createElement('div');\n    this.tooltip.style.cssText = `\n      position: absolute;\n      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);\n      color: white;\n      padding: 6px 10px;\n      border-radius: 6px;\n      border: 1px solid #475569;\n      z-index: 9999999;\n      display: none;\n      font-size: 10px;\n      pointer-events: none;\n      font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;\n      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);\n      backdrop-filter: blur(8px);\n    `;\n    document.body.appendChild(this.tooltip);\n  }\n\n  bindEvents() {\n    const collapseBtn = this.$('.inspector-toolbar-collapse');\n    collapseBtn.addEventListener('click', () => this.toggleCollapse());\n    \n    // Add keyboard navigation support\n    this.setupKeyboardNavigation();\n\n    const addAttributeBtn = this.$('#add-attribute-btn');\n    addAttributeBtn.addEventListener('click', () => this.addAttribute());\n    \n    // Add Selector button\n    const addSelectorBtn = this.$('#add-selector-btn');\n    addSelectorBtn.addEventListener('click', () => this.addSelector());\n    \n    // Stepper navigation\n    const nextStepBtn = this.$('#next-step-btn');\n    const prevStepBtn = this.$('#prev-step-btn');\n    \n    nextStepBtn.addEventListener('click', () => this.nextStep());\n    prevStepBtn.addEventListener('click', () => this.prevStep());\n    \n    // Handle event trigger changes to update step indicators\n    const eventTriggerSelect = this.$('#event-trigger');\n    if (eventTriggerSelect) {\n      eventTriggerSelect.addEventListener('change', () => {\n        this.updateStepperForEventTrigger();\n      });\n    }\n\n    this.goToStep(1);\n    \n    // Type selector buttons\n    const typeOptions = this.$$('.type-option');\n    typeOptions.forEach(option => {\n      option.addEventListener('click', () => {\n        typeOptions.forEach(btn => btn.classList.remove('active'));\n        option.classList.add('active');\n      });\n    });\n\n    const form = this.$('#custom-event-form');\n    form.addEventListener('submit', (e) => this.handleFormSubmit(e));\n    \n    // Clear errors when user starts typing\n    form.addEventListener('input', (e) => {\n      if (e.target.classList.contains('error')) {\n        this.clearFieldError(e.target);\n      }\n    });\n    \n    // Also clear errors on change for select elements\n    form.addEventListener('change', (e) => {\n      if (e.target.tagName === 'SELECT' && e.target.classList.contains('error')) {\n        this.clearFieldError(e.target);\n      }\n    });\n    \n    // Event delegation for dynamic elements\n    this.shadowRoot.addEventListener('click', (e) => {\n      if (e.target.closest('.remove-attribute-btn')) {\n        this.removeAttribute(e.target.closest('.attribute-block'));\n      }\n      if (e.target.closest('.inspect-attribute-btn')) {\n        this.activeAttributeValueInput = e.target.closest('.input-with-icon').querySelector('input');\n        this.toggleInspector();\n      }\n      if (e.target.closest('.selector-inspect-btn')) {\n        const inputField = e.target.closest('.input-with-icon').querySelector('input[name=\"elementSelector[]\"]');\n        this.activeAttributeValueInput = inputField;\n        this.toggleInspector();\n      }\n      if (e.target.closest('.remove-selector-btn')) {\n        this.removeSelector(e.target.closest('.selector-block'));\n      }\n      if (e.target.closest('.stepper-step')) {\n        const stepElement = e.target.closest('.stepper-step');\n        const stepNumber = parseInt(stepElement.dataset.step);\n        \n        // Don't allow direct navigation to step 2 if pageview is selected\n        const eventTrigger = this.$('#event-trigger')?.value;\n        if (stepNumber === 2 && eventTrigger === 'pageview') {\n          return; // Skip step 2 for pageview\n        }\n        \n        if (!stepElement.classList.contains('active') && this.isStepAccessible(stepNumber)) {\n          this.goToStep(stepNumber);\n        }\n      }\n    });\n\n    this.$('#attributes-container').addEventListener('change', (e) => {\n      if (e.target.matches('[name=\"attributeName[]\"]')) {\n        const categorySelect = this.$('#event-category');\n        const productTypeSelect = this.$('#event-type');\n        this.updateAttributes(categorySelect.value, productTypeSelect.value);\n      }\n    });\n    \n    this.boundHandleMouseOver = this.handleMouseOver.bind(this);\n    this.boundHandleMouseOut = this.handleMouseOut.bind(this);\n    this.boundHandleClick = this.handleClick.bind(this);\n\n    const categorySelect = this.$('#event-category');\n    categorySelect.addEventListener('change', (e) => this.updateProductTypes(e.target.value));\n\n    const productTypeSelect = this.$('#event-type');\n    productTypeSelect.addEventListener('change', (e) => {\n      const category = categorySelect.value;\n      const productType = e.target.value;\n      this.updateAttributes(category, productType);\n    });\n  }\n\n  attachToPage() {\n    document.body.appendChild(this.toolbarHost);\n  }\n\n  toggleInspector() {\n    this.isInspecting = !this.isInspecting;\n    if (this.isInspecting) {\n      this.startInspecting();\n      this.collapseForm();\n    } else {\n      this.stopInspecting();\n    }\n  }\n\n  startInspecting() {\n    document.body.style.cursor = 'crosshair';\n    const inspectButtons = this.$$('.selector-inspect-btn, .inspect-attribute-btn');\n    inspectButtons.forEach(btn => btn.classList.add('active'));\n    document.addEventListener('mouseover', this.boundHandleMouseOver);\n    document.addEventListener('mouseout', this.boundHandleMouseOut);\n    document.addEventListener('click', this.boundHandleClick, true);\n  }\n\n  stopInspecting() {\n    document.body.style.cursor = 'default';\n    const inspectButtons = this.$$('.selector-inspect-btn, .inspect-attribute-btn');\n    inspectButtons.forEach(btn => btn.classList.remove('active'));\n    this.highlighter.style.display = 'none';\n    this.tooltip.style.display = 'none';\n    document.removeEventListener('mouseover', this.boundHandleMouseOver);\n    document.removeEventListener('mouseout', this.boundHandleMouseOut);\n    document.removeEventListener('click', this.boundHandleClick, true);\n  }\n\n  handleMouseOver(e) {\n    if (!this.isInspecting) return;\n    const target = e.target;\n    \n    // Check if hovering over our toolbar or inspector elements\n    if (this.toolbarHost.contains(target) || target === this.highlighter || target === this.tooltip) {\n      this.highlighter.style.display = 'none';\n      this.tooltip.style.display = 'none';\n      return;\n    }\n    \n    const rect = target.getBoundingClientRect();\n    this.highlighter.style.display = 'block';\n    this.highlighter.style.top = `${rect.top + window.scrollY}px`;\n    this.highlighter.style.left = `${rect.left + window.scrollX}px`;\n    this.highlighter.style.width = `${rect.width}px`;\n    this.highlighter.style.height = `${rect.height}px`;\n\n    const selector = this.getCssSelector(target);\n    this.tooltip.style.display = 'block';\n    this.tooltip.style.top = `${rect.top + window.scrollY - 30}px`;\n    this.tooltip.style.left = `${rect.left + window.scrollX}px`;\n    this.tooltip.textContent = selector;\n  }\n  \n  handleMouseOut() {\n    if (!this.isInspecting) return;\n    this.highlighter.style.display = 'none';\n    this.tooltip.style.display = 'none';\n  }\n\n  handleClick(e) {\n    if (!this.isInspecting) return;\n    \n    const target = e.target;\n    if (this.toolbarHost.contains(target)) {\n      return;\n    }\n    \n    e.preventDefault();\n    e.stopPropagation();\n\n    const selector = this.getCssSelector(target);\n    if (this.activeAttributeValueInput) {\n      this.activeAttributeValueInput.value = selector;\n      this.activeAttributeValueInput = null;\n    }\n    this.toggleInspector();\n    this.expandForm();\n  }\n\n  showEvent(event) {\n    if (!event || !event.cssSelector) {\n      console.error('Event with a cssSelector is required.');\n      return;\n    }\n  \n    const target = document.querySelector(event.cssSelector);\n    if (!target) {\n      console.error(`Element with selector \"${event.cssSelector}\" not found.`);\n      return;\n    }\n  \n    const rect = target.getBoundingClientRect();\n  \n    const highlighter = document.createElement('div');\n    highlighter.style.cssText = `\n      position: absolute;\n      box-sizing: border-box;\n      border: 2px solid #3b82f6;\n      border-radius: 4px;\n      background-color: rgba(59, 130, 246, 0.2);\n      z-index: 9998;\n      pointer-events: all;\n      cursor: pointer;\n      animation: pulse-blue 2s infinite;\n      top: ${rect.top + window.scrollY}px;\n      left: ${rect.left + window.scrollX}px;\n      width: ${rect.width}px;\n      height: ${rect.height}px;\n    `;\n    document.body.appendChild(highlighter);\n  \n    const tooltip = document.createElement('div');\n    tooltip.style.cssText = `\n      position: absolute;\n      z-index: 9999;\n      pointer-events: none;\n      background-color: #3b82f6;\n      color: #ffffff;\n      padding: 6px 12px;\n      border-radius: 4px;\n      font-weight: bold;\n      font-size: 14px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n      top: ${rect.top + window.scrollY - 40}px;\n      left: ${rect.left + window.scrollX}px;\n    `;\n    tooltip.textContent = event.eventType || 'Event';\n    document.body.appendChild(tooltip);\n\n    highlighter.addEventListener('click', (e) => {\n      e.stopPropagation();\n      console.log('[INSPECTOR-TOOLBAR] Event clicked:', event);\n    });\n  }\n  \n  showConstantEvents() {\n    const events = this._getEvents();\n    events.forEach(event => this.showEvent(event));\n  }\n\n  // All other methods remain the same, but use this.$ and this.$$ for Shadow DOM queries\n  toggleCollapse() {\n    const formContainer = this.$('.custom-event-form-container');\n    const isCollapsed = formContainer.classList.contains('collapsed');\n    \n    if (isCollapsed) {\n      this.expandForm();\n    } else {\n      this.collapseForm();\n    }\n  }\n\n  collapseForm() {\n    const formContainer = this.$('.custom-event-form-container');\n    const collapseBtn = this.$('.inspector-toolbar-collapse');\n    \n    formContainer.classList.add('collapsed');\n    this.toolbar.classList.add('collapsed');\n    this.collapsed = true;\n    \n    const icon = '<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6,9 12,15 18,9\"></polyline></svg>';\n    collapseBtn.innerHTML = icon;\n  }\n\n  expandForm() {\n    const formContainer = this.$('.custom-event-form-container');\n    const collapseBtn = this.$('.inspector-toolbar-collapse');\n    \n    formContainer.classList.remove('collapsed');\n    this.toolbar.classList.remove('collapsed');\n    this.collapsed = false;\n    \n    const icon = '<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"18,15 12,9 6,15\"></polyline></svg>';\n    collapseBtn.innerHTML = icon;\n  }\n\n  addAttribute() {\n    this.attributeCount++;\n    const attributesContainer = this.$('#attributes-container');\n    const addButton = this.$('#add-attribute-btn');\n    \n    const newAttribute = document.createElement('div');\n    newAttribute.className = 'attribute-block';\n    newAttribute.dataset.attributeId = this.attributeCount;\n    \n    newAttribute.innerHTML = `\n      <div class=\"attribute-header\">\n        <h3 class=\"attribute-title\">Attribute ${this.attributeCount} (Optional)</h3>\n        <button type=\"button\" class=\"remove-attribute-btn\" title=\"Remove Attribute\">\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"3 6 5 6 21 6\"></polyline>\n            <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n          </svg>\n        </button>\n      </div>\n      \n      <div class=\"attribute-fields\">\n        <div class=\"attribute-name-field\">\n          <select name=\"attributeName[]\" class=\"attribute-name-select\">\n            <option value=\"\">Select Name</option>\n            <option value=\"id\">ID</option>\n            <option value=\"class\">Class</option>\n            <option value=\"data-value\">Data Value</option>\n            <option value=\"text\">Text Content</option>\n            <option value=\"href\">Link (href)</option>\n            <option value=\"src\">Image Source</option>\n            <option value=\"alt\">Alt Text</option>\n            <option value=\"title\">Title</option>\n            <option value=\"custom\">Custom</option>\n          </select>\n        </div>\n        \n        <div class=\"attribute-value-field\">\n          <div class=\"input-with-icon\">\n            <input type=\"text\" name=\"attributeValue[]\" placeholder=\"Like &#34;#sale.price&#34;\">\n            <button type=\"button\" class=\"inspect-attribute-btn toolbar-button icon-button\" title=\"Inspect Element\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-crosshair\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line><line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line><line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line></svg>\n            </button>\n          </div>\n        </div>\n      </div>\n    `;\n    \n    attributesContainer.insertBefore(newAttribute, addButton);\n    \n    const categorySelect = this.$('#event-category');\n    const productTypeSelect = this.$('#event-type');\n    this.updateAttributes(categorySelect.value, productTypeSelect.value);\n    \n    this.updateRemoveAttributeButtons();\n  }\n\n  removeAttribute(attributeBlock) {\n    const attributes = this.$$('.attribute-block');\n    if (attributes.length <= 1) return;\n    \n    attributeBlock.remove();\n    \n    const remainingAttributes = this.$$('.attribute-block');\n    remainingAttributes.forEach((attribute, index) => {\n      const title = attribute.querySelector('.attribute-title');\n      title.textContent = `Attribute ${index + 1} (Optional)`;\n      attribute.dataset.attributeId = index + 1;\n    });\n    \n    this.attributeCount = remainingAttributes.length;\n    this.updateRemoveAttributeButtons();\n  }\n\n  addSelector() {\n    this.selectorCount++;\n    const selectorsContainer = this.$('#selectors-container');\n    const addButton = this.$('#add-selector-btn');\n    \n    const newSelector = document.createElement('div');\n    newSelector.className = 'selector-block';\n    newSelector.dataset.selectorId = this.selectorCount;\n    \n    newSelector.innerHTML = `\n      <div class=\"selector-header\">\n        <h3 class=\"selector-title\">Selector ${this.selectorCount}</h3>\n        <button type=\"button\" class=\"remove-selector-btn\" title=\"Remove Selector\">\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"3 6 5 6 21 6\"></polyline>\n            <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n          </svg>\n        </button>\n      </div>\n      \n      <div class=\"form-group-row\">\n        <label>Element Selector</label>\n        <div class=\"input-with-icon\">\n          <input type=\"text\" name=\"elementSelector[]\" placeholder=\"Like &#34;#sale.addtocart&#34;\" required>\n          <button type=\"button\" class=\"selector-inspect-btn toolbar-button icon-button\" title=\"Inspect Element\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-crosshair\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line><line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line><line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line></svg>\n          </button>\n        </div>\n      </div>\n      \n      <div class=\"form-group-row\">\n        <label>Page Pattern (Optional)</label>\n        <div class=\"page-pattern-container\">\n          <div class=\"pattern-operator\">\n            <select name=\"patternOperator[]\" class=\"pattern-operator-select border-none\">\n              <option value=\"equals\">Equals</option>\n              <option value=\"contains\">Contains</option>\n              <option value=\"starts_with\">Starts with</option>\n              <option value=\"ends_with\">Ends with</option>\n            </select>\n          </div>\n          <input type=\"text\" name=\"patternValue[]\" class=\"pattern-value border-none\" placeholder=\"Value\">\n        </div>\n      </div>\n    `;\n    \n    selectorsContainer.insertBefore(newSelector, addButton);\n    this.updateRemoveSelectorButtons();\n  }\n  \n  removeSelector(selectorBlock) {\n    const selectors = this.$$('.selector-block');\n    if (selectors.length <= 1) return;\n    \n    selectorBlock.remove();\n    \n    const remainingSelectors = this.$$('.selector-block');\n    remainingSelectors.forEach((selector, index) => {\n      const title = selector.querySelector('.selector-title');\n      title.textContent = `Selector ${index + 1}`;\n      selector.dataset.selectorId = index + 1;\n    });\n    \n    this.selectorCount = remainingSelectors.length;\n    this.updateRemoveSelectorButtons();\n  }\n\n  updateRemoveSelectorButtons() {\n    const selectors = this.$$('.selector-block');\n    selectors.forEach((selector) => {\n      const removeBtn = selector.querySelector('.remove-selector-btn');\n      if (selectors.length > 1) {\n        removeBtn.classList.remove('remove-selector-btn-hide');\n      } else {\n        removeBtn.classList.add('remove-selector-btn-hide');\n      }\n    });\n  }\n\n  updateRemoveAttributeButtons() {\n    const attributes = this.$$('.attribute-block');\n    attributes.forEach((attribute) => {\n      const removeBtn = attribute.querySelector('.remove-attribute-btn');\n      if (attributes.length > 1) {\n        removeBtn.classList.remove('remove-attribute-btn-hide');\n      } else {\n        removeBtn.classList.add('remove-attribute-btn-hide');\n      }\n    });\n  }\n\n  // Continue with remaining methods...\n  // [All other methods remain the same but use this.$ and this.$$ for Shadow DOM queries]\n  \n  nextStep() {\n    if (this.currentStep < this.totalSteps) {\n      const isValid = this.validateStep(this.currentStep);\n      if (!isValid) return;\n      \n      this.markStepCompleted(this.currentStep);\n      \n      // Skip step 2 (Selectors) if Page View is selected\n      let nextStepNumber = this.currentStep + 1;\n      if (this.currentStep === 1) {\n        const eventTrigger = this.$('#event-trigger')?.value;\n        if (eventTrigger === 'pageview' && nextStepNumber === 2) {\n          // Mark step 2 as completed and skip to step 3\n          this.markStepCompleted(2);\n          nextStepNumber = 3;\n        }\n      }\n      \n      this.goToStep(nextStepNumber);\n    } else {\n      this.handleFormSubmit(new Event('submit'));\n    }\n  }\n  \n  prevStep() {\n    if (this.currentStep === 1) {\n      this.toggleCollapse();\n    } else if (this.currentStep > 1) {\n      // Skip step 2 (Selectors) when going back if Page View is selected\n      let prevStepNumber = this.currentStep - 1;\n      if (this.currentStep === 3) {\n        const eventTrigger = this.$('#event-trigger')?.value;\n        if (eventTrigger === 'pageview' && prevStepNumber === 2) {\n          prevStepNumber = 1;\n        }\n      }\n      this.goToStep(prevStepNumber);\n    }\n  }\n  \n  goToStep(stepNumber) {\n    if (stepNumber < 1 || stepNumber > this.totalSteps) return;\n    \n    const prevStepBtn = this.$('#prev-step-btn');\n    const nextStepBtn = this.$('#next-step-btn');\n    \n    prevStepBtn.disabled = false;\n    \n    if (stepNumber === 1) {\n      prevStepBtn.innerHTML = `\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n        Cancel\n      `;\n    } else {\n      prevStepBtn.innerHTML = `\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <polyline points=\"15 18 9 12 15 6\"></polyline>\n        </svg>\n        Previous\n      `;\n    }\n\n    if (stepNumber === this.totalSteps) {\n      nextStepBtn.innerHTML = `\n        <span id=\"submit-btn\">\n        Save & Done\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"></path>\n          <polyline points=\"17,21 17,13 7,13 7,21\"></polyline>\n          <polyline points=\"7,3 7,8 15,8\"></polyline>\n        </svg>\n        </span>\n      `;\n    } else {\n      nextStepBtn.innerHTML = `\n        Next\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <polyline points=\"9 18 15 12 9 6\"></polyline>\n        </svg>\n      `;\n    }\n   \n    const steps = this.$$('.stepper-step');\n    const contents = this.$$('.step-content');\n    \n    steps.forEach(step => step.classList.remove('active'));\n    contents.forEach(content => content.classList.remove('active'));\n    \n    steps[stepNumber - 1].classList.add('active');\n    contents[stepNumber - 1].classList.add('active');\n    \n    // Restore checkmarks for all completed steps\n    steps.forEach((stepElement, index) => {\n      const currentStepNum = index + 1;\n      if (this.completedSteps.includes(currentStepNum)) {\n        stepElement.classList.add('completed');\n        const stepNumberElement = stepElement.querySelector('.step-number');\n        if (stepNumberElement && !stepNumberElement.classList.contains('has-checkmark')) {\n          stepNumberElement.classList.add('has-checkmark');\n          stepNumberElement.innerHTML = `\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <polyline points=\"20 6 9 17 4 12\"></polyline>\n            </svg>\n          `;\n        }\n      }\n    });\n    \n    this.currentStep = stepNumber;\n  }\n\n  markStepCompleted(stepNumber) {\n    if (!this.completedSteps.includes(stepNumber)) {\n      this.completedSteps.push(stepNumber);\n    }\n    \n    const steps = this.$$('.stepper-step');\n    const stepElement = steps[stepNumber - 1];\n    \n    if (stepElement) {\n      stepElement.classList.add('completed');\n      \n      const stepNumberElement = stepElement.querySelector('.step-number');\n      if (stepNumberElement && !stepNumberElement.classList.contains('has-checkmark')) {\n        stepNumberElement.classList.add('has-checkmark');\n        stepNumberElement.innerHTML = `\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        `;\n      }\n    }\n  }\n  \n  isStepAccessible(stepNumber) {\n    if (stepNumber === 1) return true;\n    return this.completedSteps.includes(stepNumber - 1) || this.currentStep >= stepNumber;\n  }\n\n  updateStepperForEventTrigger() {\n    const eventTrigger = this.$('#event-trigger')?.value;\n    const step2Element = this.$('.stepper-step[data-step=\"2\"]');\n    const step2Label = step2Element?.querySelector('.step-label');\n    \n    if (eventTrigger === 'pageview') {\n      // Visually indicate step 2 will be skipped\n      if (step2Element) {\n        step2Element.classList.add('will-skip');\n        if (step2Label) {\n          step2Label.textContent = 'Selectors (Skipped)';\n        }\n      }\n    } else {\n      // Reset to normal state\n      if (step2Element) {\n        step2Element.classList.remove('will-skip');\n        if (step2Label) {\n          step2Label.textContent = 'Selectors';\n        }\n      }\n    }\n  }\n\n  validateStep(step) {\n    this.clearValidationErrors();\n    let hasErrors = false;\n    const stepContent = this.$(`.step-content[data-step=\"${step}\"]`);\n    \n    if (step === 1) {\n      const validationRules = {\n        category: 'Category is required',\n        eventType: 'Event type is required', \n        eventTrigger: 'Event trigger is required',\n        countType: 'Count type is required'\n      };\n      \n      Object.entries(validationRules).forEach(([fieldName, errorMessage]) => {\n        const field = stepContent.querySelector(`[name=\"${fieldName}\"]`);\n        if (!field.value.trim()) {\n          this.showFieldError(field, errorMessage);\n          hasErrors = true;\n        }\n      });\n    } else if (step === 2) {\n      // Skip validation for step 2 if pageview is selected\n      const eventTrigger = this.$('#event-trigger')?.value;\n      if (eventTrigger === 'pageview') {\n        return true; // Skip validation for pageview\n      }\n      \n      const selectorInputs = stepContent.querySelectorAll('input[name=\"elementSelector[]\"]');\n      let hasValidSelector = false;\n      \n      for (const selectorInput of selectorInputs) {\n        if (selectorInput.value.trim()) {\n          hasValidSelector = true;\n          selectorInput.classList.remove('error');\n        }\n      }\n      \n      if (!hasValidSelector) {\n        hasErrors = true;\n        if (selectorInputs.length > 0) {\n          this.showFieldError(selectorInputs[0], 'At least one element selector is required');\n        }\n      }\n    }\n    \n    return !hasErrors;\n  }\n\n  showFieldError(field, message) {\n    field.classList.add('error');\n    \n    let errorContainer = field.parentElement;\n    if (field.name === 'elementSelector[]' && field.parentElement.classList.contains('input-with-icon')) {\n      errorContainer = field.parentElement.parentElement;\n    }\n    \n    let errorElement = errorContainer.querySelector('.field-error-message');\n    if (!errorElement) {\n      errorElement = document.createElement('div');\n      errorElement.className = 'field-error-message';\n      errorContainer.appendChild(errorElement);\n    }\n    errorElement.textContent = message;\n  }\n  \n  clearFieldError(field) {\n    field.classList.remove('error');\n    \n    let errorContainer = field.parentElement;\n    if (field.name === 'elementSelector[]' && field.parentElement.classList.contains('input-with-icon')) {\n      errorContainer = field.parentElement.parentElement;\n    }\n    \n    const errorElement = errorContainer.querySelector('.field-error-message');\n    if (errorElement) {\n      errorElement.remove();\n    }\n  }\n\n  clearValidationErrors() {\n    const form = this.$('#custom-event-form');\n    form.querySelectorAll('.error').forEach(field => {\n      field.classList.remove('error');\n    });\n    \n    form.querySelectorAll('.field-error-message').forEach(errorMsg => {\n      errorMsg.remove();\n    });\n  }\n\n  handleFormSubmit(e) {\n    e.preventDefault();\n    \n    for (let step = 1; step <= this.totalSteps; step++) {\n      const isValid = this.validateStep(step);\n      if (!isValid) {\n        this.goToStep(step);\n        return;\n      }\n    }\n    \n    const formData = new FormData(this.$('#custom-event-form'));\n    const activeTypeButton = this.$('.type-option.active');\n    const data = {\n      type: activeTypeButton ? activeTypeButton.dataset.type : 'key',\n      category: formData.get('category'),\n      eventType: formData.get('eventType'),\n      eventTrigger: formData.get('eventTrigger'),\n      countType: formData.get('countType'),\n      selectors: []\n    };\n    \n    const elementSelectors = formData.getAll('elementSelector[]');\n    const patternOperators = formData.getAll('patternOperator[]');\n    const patternValues = formData.getAll('patternValue[]');\n    \n    for (let i = 0; i < elementSelectors.length; i++) {\n      data.selectors.push({\n        elementSelector: elementSelectors[i],\n        pattern: {\n          operator: patternOperators[i],\n          value: patternValues[i]\n        }\n      });\n    }\n    \n    const attributeNames = formData.getAll('attributeName[]');\n    const attributeValues = formData.getAll('attributeValue[]');\n    data.attributes = [];\n    \n    for (let i = 0; i < attributeNames.length; i++) {\n      if (attributeNames[i] && attributeValues[i].trim()) {\n        data.attributes.push({\n          name: attributeNames[i],\n          value: attributeValues[i]\n        });\n      }\n    }\n    \n    this.showLoadingState();\n    this.callApi(data);\n  }\n\n  showLoadingState() {\n    const submitBtn = this.$('#submit-btn');\n    if (!submitBtn) return;\n    \n    submitBtn.disabled = true;\n    submitBtn.innerHTML = `\n      <svg class=\"spinner\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n        <circle cx=\"12\" cy=\"12\" r=\"10\" stroke-opacity=\"0.25\"></circle>\n        <path d=\"M12 2a10 10 0 0 1 10 10\" stroke-linecap=\"round\"></path>\n      </svg>\n      Creating Event...\n    `;\n  }\n\n  hideLoadingState() {\n    const submitBtn = this.$('#next-step-btn');\n    if (!submitBtn) return;\n    \n    submitBtn.disabled = false;\n    submitBtn.innerHTML = `\n      <span id=\"submit-btn\">\n      Save & Done\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"></path>\n        <polyline points=\"17,21 17,13 7,13 7,21\"></polyline>\n        <polyline points=\"7,3 7,8 15,8\"></polyline>\n      </svg>\n      </span>\n    `;\n  }\n\n  showMessage(message, type = 'success') {\n    if (this.options.debug) {\n      console.log('[INSPECTOR-TOOLBAR] Message:', message, 'Type:', type);\n    }\n\n    // Create or get toast container in the main document body (outside Shadow DOM)\n    let toastContainer = document.getElementById('inspector-toast-container');\n    if (!toastContainer) {\n      toastContainer = document.createElement('div');\n      toastContainer.id = 'inspector-toast-container';\n      toastContainer.style.cssText = `\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        z-index: 999999;\n        display: flex;\n        flex-direction: column;\n        gap: 10px;\n        pointer-events: none;\n      `;\n      document.body.appendChild(toastContainer);\n    }\n\n    // Create toast element\n    const toast = document.createElement('div');\n    toast.style.cssText = `\n      min-width: 300px;\n      max-width: 400px;\n      padding: 14px 18px;\n      border-radius: 10px;\n      font-weight: 500;\n      font-size: 14px;\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      pointer-events: auto;\n      animation: toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n      transition: all 0.3s ease;\n      position: relative;\n      overflow: hidden;\n      backdrop-filter: blur(10px);\n      line-height: 1.4;\n      ${type === 'success' ? `\n        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%);\n        color: white;\n        border: 1px solid rgba(16, 185, 129, 0.3);\n        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n      ` : type === 'error' ? `\n        background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);\n        color: white;\n        border: 1px solid rgba(239, 68, 68, 0.3);\n        box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n      ` : type === 'warning' ? `\n        background: linear-gradient(135deg, rgba(251, 146, 60, 0.95) 0%, rgba(249, 115, 22, 0.95) 100%);\n        color: white;\n        border: 1px solid rgba(251, 146, 60, 0.3);\n        box-shadow: 0 4px 20px rgba(251, 146, 60, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n      ` : `\n        background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);\n        color: white;\n        border: 1px solid rgba(59, 130, 246, 0.3);\n        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n      `}\n    `;\n    \n    // Icons for different types\n    const icons = {\n      success: '<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path><polyline points=\"22 4 12 14.01 9 11.01\"></polyline></svg>',\n      error: '<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line></svg>',\n      info: '<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line></svg>',\n      warning: '<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"17\"></line></svg>'\n    };\n\n    toast.innerHTML = `\n      <div style=\"flex-shrink: 0; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;\">${icons[type] || icons.info}</div>\n      <div style=\"flex: 1; word-wrap: break-word;\">${message}</div>\n      <button style=\"flex-shrink: 0; width: 20px; height: 20px; background: transparent; border: none; color: currentColor; cursor: pointer; opacity: 0.7; transition: opacity 0.2s ease; padding: 0; display: flex; align-items: center; justify-content: center;\" aria-label=\"Close\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n      </button>\n      <div style=\"position: absolute; bottom: 0; left: 0; height: 3px; width: 100%; background: rgba(255, 255, 255, 0.3); animation: toastProgress 5s linear; transform-origin: left;\"></div>\n    `;\n\n    // Add CSS animations if not already present\n    if (!document.getElementById('inspector-toast-styles')) {\n      const style = document.createElement('style');\n      style.id = 'inspector-toast-styles';\n      style.textContent = `\n        @keyframes toastSlideIn {\n          from {\n            opacity: 0;\n            transform: translateX(100%);\n          }\n          to {\n            opacity: 1;\n            transform: translateX(0);\n          }\n        }\n        @keyframes toastSlideOut {\n          from {\n            opacity: 1;\n            transform: translateX(0);\n          }\n          to {\n            opacity: 0;\n            transform: translateX(100%);\n          }\n        }\n        @keyframes toastProgress {\n          from {\n            transform: scaleX(1);\n          }\n          to {\n            transform: scaleX(0);\n          }\n        }\n      `;\n      document.head.appendChild(style);\n    }\n\n    // Add to container\n    toastContainer.appendChild(toast);\n\n    // Close button functionality\n    const closeBtn = toast.querySelector('button');\n    const removeToast = () => {\n      toast.style.animation = 'toastSlideOut 0.3s ease forwards';\n      setTimeout(() => {\n        toast.remove();\n        // Remove container if empty\n        if (toastContainer.children.length === 0) {\n          toastContainer.remove();\n        }\n      }, 300);\n    };\n\n    closeBtn.addEventListener('click', removeToast);\n    closeBtn.addEventListener('mouseenter', function() {\n      this.style.opacity = '1';\n    });\n    closeBtn.addEventListener('mouseleave', function() {\n      this.style.opacity = '0.7';\n    });\n\n    // Auto remove after 5 seconds\n    const autoRemoveTimeout = setTimeout(removeToast, 5000);\n\n    // Clear timeout if user hovers (optional enhancement)\n    toast.addEventListener('mouseenter', () => {\n      clearTimeout(autoRemoveTimeout);\n      const progress = toast.querySelector('div:last-child');\n      if (progress) {\n        progress.style.animationPlayState = 'paused';\n      }\n    });\n\n    toast.addEventListener('mouseleave', () => {\n      const progress = toast.querySelector('div:last-child');\n      if (progress) {\n        progress.style.animationPlayState = 'running';\n      }\n      setTimeout(removeToast, 2000);\n    });\n  }\n\n  async callApi(data) {\n    const urlParams = new URLSearchParams(window.location.search);\n    let apiUrl = this.options.apiUrl || urlParams.get('api_url');\n    let token = this.options.token || urlParams.get('token');\n    \n    if (!apiUrl && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {\n      apiUrl = 'http://87.247.186.146:8001/api/v1/';\n    }\n\n    if (!apiUrl) {\n      console.error('[INSPECTOR-TOOLBAR] No api_url found in search params, skipping API call.');\n      this.hideLoadingState();\n      this.showMessage('API URL not configured. Please provide api_url parameter.', 'error');\n      return;\n    }\n    \n    const selector = (data?.selectors?.map(selector => selector?.elementSelector) || [])?.join(', ')\n\n    let attributes = {}\n\n    data?.attributes?.forEach(attribute => {\n      attributes[attribute?.name] = {\n        type: 'css_selector',\n        value: attribute?.value,\n        value_type: this.categoriesData?.[data?.category]?.[data?.eventType]?.[attribute?.name]?.value_type || 'varchar'\n       }\n    })\n\n    const payload = {\n      attributes,\n      \"count_method\": data?.countType,\n      category: data.type === 'general' ? 'default' : 'goal',\n      \"custom_category\": data?.category,\n      \"domain\": window.location.hostname,\n      \"event_type\": data?.eventTrigger,\n      \"name\": data?.eventType,\n      \"product_type\": data?.eventType,\n      \"type\": \"event\",\n      page_url: data?.selectors?.map(selector => {\n        return {\n          \"operator\": selector?.pattern?.operator,\n          \"url\": selector?.pattern?.value\n        }\n      }) || [],\n      \"selector\": {\n        \"type\": \"css_selector\",\n        \"value\": selector,\n      },\n    }\n    \n    try {\n      const createEventUrl = apiUrl + `goals/site/domain/${window.location.hostname}`\n      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : {};\n      const response = await fetch(createEventUrl, {\n        method: 'POST',\n        body: JSON.stringify(payload),\n        headers: headers\n      });\n      \n      if (!response.ok) {\n        let errorMessage = 'Failed to create event';\n        try {\n          const error = await response.json();\n          errorMessage = error.message || error.error || errorMessage;\n        } catch (e) {\n          errorMessage = `HTTP ${response.status}: ${response.statusText}`;\n        }\n        this.hideLoadingState();\n        this.showMessage(errorMessage, 'error');\n        return;\n      }\n\n      this.goToStep(1);\n      this.$('#custom-event-form').reset();\n      this.hideLoadingState();\n      this.showMessage('Event created successfully!', 'success');\n      this.toggleCollapse();\n      \n    } catch (error) {\n      this.hideLoadingState();\n      const errorMessage = error.message || 'Network error occurred. Please check your connection.';\n      this.showMessage(`Error: ${errorMessage}`, 'error');\n      console.error('[INSPECTOR-TOOLBAR] API Error:', error);\n    }\n  }\n\n  async fetchCategories() {\n    const urlParams = new URLSearchParams(window?.location?.search || '');\n    let apiUrl = this.options.apiUrl || urlParams.get('api_url');\n    let token = this.options.token || urlParams.get('token');\n    \n    if (!apiUrl && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {\n      apiUrl = 'http://87.247.186.146:8001/api/v1/';\n    }\n\n    if (!apiUrl) {\n      console.warn('[INSPECTOR-TOOLBAR] No API URL configured');\n      return;\n    }\n    \n    const url = `${apiUrl}analytics/categories/structure`;\n\n    try {\n      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : {};\n      const response = await fetch(url, { headers });\n\n      const result = await response.json();\n\n      if (this.options.debug) {\n        console.log('[INSPECTOR-TOOLBAR] Categories response:', result);\n      }\n\n      const categoriesData = Object.entries(result).map(([key, value]) => {\n        const productTypes = Object.keys(value || {}) || []\n\n        return {\n          category: key,\n          product_types: productTypes\n        }\n      })\n\n      if (!response.ok) {\n        console.error(`[INSPECTOR-TOOLBAR] Error fetching categories: HTTP ${response.status}`);\n        throw new Error(`Failed to fetch categories: ${response.statusText}`);\n      }\n\n      this.categoriesData = categoriesData || []\n      this.rawCategoriesData = result || null\n      this.populateCategories();\n    } catch (error) {\n      console.error('[INSPECTOR-TOOLBAR] Failed to fetch categories:', error);\n      const categorySelect = this.$('#event-category');\n      categorySelect.innerHTML = '<option value=\"\">Error loading categories</option>';\n      \n      this.showMessage('Failed to load categories. Please check your connection.', 'error');\n    }\n  }\n\n  populateCategories() {\n    const categorySelect = this.$('#event-category');\n    \n    if (this.options.debug) {\n      console.log('[INSPECTOR-TOOLBAR] Populating categories:', this.categoriesData);\n    }\n    \n    if (!this.categoriesData || this.categoriesData.length === 0) {\n      categorySelect.innerHTML = '<option value=\"\">No categories available</option>';\n      return;\n    }\n\n    categorySelect.innerHTML = '<option value=\"\">Select a category</option>';\n\n    this.categoriesData.forEach(category => {\n      const option = document.createElement('option');\n      option.value = category.category;\n      option.textContent = category.category.charAt(0).toUpperCase() + category.category.slice(1);\n      categorySelect.appendChild(option);\n    })\n  }\n\n  updateProductTypes(selectedCategory) {\n    const productTypeSelect = this.$('#event-type');\n    const attributeSelects = this.$$('[name=\"attributeName[]\"]');\n    \n    productTypeSelect.innerHTML = '';\n    attributeSelects.forEach(s => s.innerHTML = '');\n\n    const categoryData = this.categoriesData.find(c => c.category === selectedCategory);\n\n    if (categoryData && categoryData.product_types) {\n      productTypeSelect.innerHTML = '<option value=\"\">Select a product type</option>';\n      categoryData.product_types.forEach(productType => {\n        const option = document.createElement('option');\n        option.value = productType;\n        option.textContent = productType.charAt(0).toUpperCase() + productType.slice(1);\n        productTypeSelect.appendChild(option);\n      });\n    } else {\n      productTypeSelect.innerHTML = '<option value=\"\">Please select a category first</option>';\n      attributeSelects.forEach(s => s.innerHTML = '<option value=\"\">Please select a category first</option>');\n    }\n  }\n\n  updateAttributes(selectedCategory, selectedProductType) {\n    const attributeSelects = this.$$('[name=\"attributeName[]\"]');\n    const allAttributes = Object.keys(this.rawCategoriesData?.[selectedCategory]?.[selectedProductType] || {});\n\n    const selectedValues = Array.from(attributeSelects)\n      .map(select => select.value)\n      .filter(value => value !== '');\n\n    attributeSelects.forEach(attributeSelect => {\n      const currentValue = attributeSelect.value;\n      attributeSelect.innerHTML = '<option value=\"\">Select an attribute</option>';\n      \n      const availableAttributes = allAttributes.filter(attr => {\n        return !selectedValues.includes(attr) || attr === currentValue;\n      });\n\n      availableAttributes.forEach(attr => {\n        const option = document.createElement('option');\n        option.value = attr;\n        option.textContent = attr.charAt(0).toUpperCase() + attr.slice(1);\n        attributeSelect.appendChild(option);\n      });\n\n      attributeSelect.value = currentValue;\n    });\n  }\n\n  setupKeyboardNavigation() {\n    document.addEventListener('keydown', (e) => {\n      if (!this.toolbarHost) return;\n      \n      const isInputFocused = document.activeElement && \n        (document.activeElement.tagName === 'INPUT' || \n         document.activeElement.tagName === 'TEXTAREA' || \n         document.activeElement.tagName === 'SELECT');\n      \n      // Also check if the focused element is inside our Shadow DOM\n      const shadowActiveElement = this.shadowRoot.activeElement;\n      const isShadowInputFocused = shadowActiveElement && \n        (shadowActiveElement.tagName === 'INPUT' || \n         shadowActiveElement.tagName === 'TEXTAREA' || \n         shadowActiveElement.tagName === 'SELECT');\n      \n      const isAnyInputFocused = isInputFocused || isShadowInputFocused;\n      \n      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {\n        e.preventDefault();\n        this.toggle();\n      }\n      \n      if (e.key === 'Escape') {\n        if (this.isInspecting) {\n          e.preventDefault();\n          this.stopInspecting();\n        } else if (!this.collapsed && this.isVisible) {\n          e.preventDefault();\n          this.collapseForm();\n        }\n      }\n      \n      if (!this.collapsed && this.isVisible && !isAnyInputFocused) {\n        if (e.key === 'ArrowLeft' && this.currentStep > 1) {\n          e.preventDefault();\n          this.prevStep();\n        } else if (e.key === 'ArrowRight' && this.currentStep < this.totalSteps) {\n          e.preventDefault();\n          this.nextStep();\n        }\n      }\n      \n      if ((e.ctrlKey || e.metaKey) && e.key === 'i' && this.isVisible && !this.collapsed) {\n        e.preventDefault();\n        if (!this.isInspecting) {\n          const inspectBtn = this.$('.selector-inspect-btn, .inspect-attribute-btn');\n          if (inspectBtn) {\n            inspectBtn.click();\n          }\n        } else {\n          this.stopInspecting();\n        }\n      }\n      \n      if (e.key === 'Enter' && !isAnyInputFocused && this.currentStep === this.totalSteps && !this.collapsed) {\n        e.preventDefault();\n        this.handleFormSubmit(new Event('submit'));\n      }\n    });\n    \n    const form = this.$('#custom-event-form');\n    if (form) {\n      const interactiveElements = form.querySelectorAll('input, select, button, textarea');\n      interactiveElements.forEach(element => {\n        if (!element.hasAttribute('tabindex')) {\n          element.setAttribute('tabindex', '0');\n        }\n      });\n    }\n  }\n\n  getCssSelector(el) {\n    let path = [], parent;\n    while (parent = el.parentNode) {\n        let tag = el.tagName, siblings;\n        path.unshift(\n            el.id ? `#${el.id}` : (\n                siblings = parent.children,\n                [].filter.call(siblings, (sibling) => sibling.tagName === tag).length === 1 ? tag.toLowerCase() :\n                `${tag.toLowerCase()}:nth-child(${1 + [].indexOf.call(siblings, el)})`\n            )\n        );\n        el = parent;\n    }\n    return `${path.join(' > ')}`.toLowerCase();\n  }\n  \n  show() {\n    if (!this.isVisible) {\n      this.toolbarHost.style.display = 'block';\n      setTimeout(() => {\n        this.toolbarHost.style.transform = 'translateX(-50%) translateY(0)';\n      }, 10);\n      this.isVisible = true;\n    }\n    return this;\n  }\n\n  hide() {\n    if (this.isVisible) {\n      this.toolbarHost.style.transform = 'translateX(-50%) translateY(100%)';\n      setTimeout(() => {\n        this.toolbarHost.style.display = 'none';\n      }, 300);\n      this.isVisible = false;\n    }\n    if (this.isInspecting) {\n        this.toggleInspector();\n    }\n    return this;\n  }\n\n  toggle() {\n    return this.isVisible ? this.hide() : this.show();\n  }\n\n  destroy() {\n    if (this.toolbarHost && this.toolbarHost.parentNode) {\n      this.toolbarHost.parentNode.removeChild(this.toolbarHost);\n    }\n    if (this.highlighter && this.highlighter.parentNode) {\n        this.highlighter.parentNode.removeChild(this.highlighter);\n    }\n    if (this.tooltip && this.tooltip.parentNode) {\n        this.tooltip.parentNode.removeChild(this.tooltip);\n    }\n    // Remove toast container\n    const toastContainer = document.getElementById('inspector-toast-container');\n    if (toastContainer) {\n      toastContainer.remove();\n    }\n    // Remove toast styles\n    const toastStyles = document.getElementById('inspector-toast-styles');\n    if (toastStyles) {\n      toastStyles.remove();\n    }\n    this.toolbarHost = null;\n    this.shadowRoot = null;\n    this.toolbar = null;\n    this.highlighter = null;\n    this.tooltip = null;\n    this.isVisible = false;\n    if (this.isInspecting) {\n        this.stopInspecting();\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InspectorToolbar);\n\nif (typeof window !== 'undefined') {\n  window.InspectorToolbar = InspectorToolbar;\n}\n\n//# sourceURL=webpack://InspectorToolbar/./src/index-shadow.js?\n}");

/***/ }),

/***/ "./src/shadow-styles.js":
/*!******************************!*\
  !*** ./src/shadow-styles.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getShadowStyles: () => (/* binding */ getShadowStyles)\n/* harmony export */ });\n// Styles to be injected into Shadow DOM\nconst getShadowStyles = () => `\n.input-with-icon {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n\n.input-with-icon input {\n  padding-right: 32px; \n}\n\n.input-with-icon .icon-button {\n  position: absolute;\n  right: 4px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 24px;\n  height: 24px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n\n.input-with-icon .icon-button:hover {\n  background: rgba(59, 130, 246, 0.1);\n  transform: translateY(-50%) scale(1.05);\n}\n\n.input-with-icon .icon-button.active {\n  background: rgba(59, 130, 246, 0.2);\n  color: #2563eb;\n  transform: translateY(-50%) scale(1.05);\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);\n}\n\n.inspector-toolbar-wrapper {\n  width: 680px;\n  background:  #ffffff;\n  color: #1e293b;\n  border-radius: 10px;\n  padding: 8px 6px;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(37, 99, 235, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1);\n  border: 1.5px solid #e2e8f0;\n  transition: transform 0.3s ease, \n              max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              box-shadow 0.3s ease;\n  display: flex;\n  flex-direction: column;\n  max-height: min(90vh, 600px);\n  will-change: max-height;\n}\n\n.inspector-toolbar-wrapper.collapsed {\n  max-height: 56px;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.inspector-toolbar-wrapper:not(.collapsed) {\n  max-height: min(90vh, 600px);\n  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.inspector-toolbar-content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 8px;\n  height: 40px;\n  min-height: 40px;\n  flex-shrink: 0;\n}\n\n.inspector-toolbar-collapse {\n  background-color: transparent;\n  border: none;\n  color: #475569;\n  font-size: 18px;\n  cursor: pointer;\n  padding: 0;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.inspector-toolbar-collapse svg {\n  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: transform;\n}\n\n.inspector-toolbar-collapse:hover {\n  transform: translateY(-1px);\n}\n\n.toolbar-left, .toolbar-right {\n  display: flex;\n  align-items: center;\n}\n\n.toolbar-logo {\n  background: #374151;\n  font-weight: 700;\n  margin-right: 12px;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  font-size: 15px;\n  letter-spacing: -0.3px;\n  white-space: nowrap;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.toolbar-button {\n  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);\n  border: 1.5px solid #e5e7eb;\n  color: #475569;\n  padding: 6px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  font-weight: 500;\n  font-size: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  height: 28px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  gap: 6px;\n  will-change: transform, box-shadow;\n}\n\n.toolbar-button:hover {\n  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);\n  border-color: #94a3b8;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n\n.custom-event-form-container {\n  background: #ffffff;\n  padding: 16px 8px;\n  padding-bottom: 0;\n  border-top: 1.5px solid #e5e7eb;\n  border-radius: 0 0 10px 10px;\n  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), \n              padding 0.35s cubic-bezier(0.4, 0, 0.2, 1), \n              opacity 0.25s ease-in-out,\n              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              border-top-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: min(calc(90vh - 100px), 520px);\n  opacity: 1;\n  display: flex;\n  flex-direction: column;\n  transform-origin: top;\n  transform: scaleY(1);\n  will-change: max-height, transform, opacity;\n  position: relative;\n}\n\n.custom-event-form-container.collapsed {\n  max-height: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  opacity: 0;\n  border-top-width: 0;\n  transform: scaleY(0.95);\n  transition-delay: 0s;\n}\n\n/* Reset common styles that might be inherited */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\ninput, select, textarea, button {\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 1.5;\n}\n\ninput[type=\"text\"],\ninput[type=\"email\"],\nselect,\ntextarea {\n  width: 100%;\n  padding: 8px 10px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  background: white;\n  color: #1e293b;\n  transition: all 0.2s ease;\n}\n\ninput[type=\"text\"]:focus,\ninput[type=\"email\"]:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n\nselect {\n  cursor: pointer;\n  appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6,9 12,15 18,9'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 10px center;\n  padding-right: 32px;\n}\n\nlabel {\n  display: block;\n  font-size: 13px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 6px;\n}\n\n/* Stepper styles */\n.stepper-container {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  opacity: 0;\n  transition: opacity 0.2s ease-out;\n  position: relative;\n}\n\n.custom-event-form-container:not(.collapsed) .stepper-container {\n  opacity: 1;\n  transition: opacity 0.25s ease-in 0.05s;\n}\n\n.stepper-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 0 12px;\n  margin-bottom: 8px;\n}\n\n.stepper-title {\n  font-size: 17px;\n  font-weight: 600;\n  color: #374151;\n}\n\n.stepper-progress {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n  justify-content: center;\n}\n\n.stepper-step {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  cursor: pointer;\n}\n\n.step-number {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background-color: #e5e7eb;\n  color: #6b7280;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 13px;\n  margin-bottom: 6px;\n  transition: all 0.3s ease;\n}\n\n.step-label {\n  font-size: 12px;\n  color: #6b7280;\n  font-weight: 500;\n  white-space: nowrap;\n  transition: color 0.3s ease;\n}\n\n.stepper-connector {\n  flex: 1;\n  height: 1px;\n  background: #e5e7eb;\n  margin: 0 12px;\n  position: relative;\n  top: -9px;\n}\n\n.stepper-step.active .step-number {\n  background: #2563eb;\n  color: white;\n  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);\n}\n\n.stepper-step.active .step-label {\n  color: #374151;\n  font-weight: 600;\n}\n\n.stepper-step.completed .step-number {\n  background: #059669;\n  color: white;\n  box-shadow: 0 2px 6px rgba(5, 150, 105, 0.2);\n}\n\n.stepper-step.will-skip {\n  opacity: 0.5;\n}\n\n.stepper-step.will-skip .step-number {\n  background: #6b7280;\n  color: white;\n}\n\n.stepper-step.will-skip .step-label {\n  color: #6b7280;\n  font-style: italic;\n}\n\n.stepper-content {\n  position: relative;\n  overflow-y: visible;\n  overflow-x: hidden;\n  flex: 1;\n  padding-bottom: 16px;\n  min-height: 0;\n}\n\n.custom-event-form-container::-webkit-scrollbar {\n  width: 6px;\n}\n\n.custom-event-form-container::-webkit-scrollbar-track {\n  background: rgba(148, 163, 184, 0.1);\n  border-radius: 3px;\n}\n\n.custom-event-form-container::-webkit-scrollbar-thumb {\n  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);\n  border-radius: 3px;\n  transition: background 0.2s ease;\n}\n\n.custom-event-form-container::-webkit-scrollbar-thumb:hover {\n  background: linear-gradient(135deg, #64748b 0%, #475569 100%);\n}\n\n.step-content {\n  display: none;\n  opacity: 0;\n  transform: translateX(20px);\n  transition: all 0.3s ease;\n  padding-bottom: 16px;\n}\n\n.step-content.active {\n  display: block;\n  opacity: 1;\n  transform: translateX(0);\n}\n\n.form-group-row {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 16px;\n}\n\n.form-group-row-split {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.form-group-half {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n.type-selector {\n  display: flex;\n  gap: 8px;\n}\n\n.type-option {\n  flex: 1;\n  padding: 8px 16px;\n  border: 1.5px solid #e5e7eb;\n  background: white;\n  color: #64748b;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-weight: 500;\n}\n\n.type-option:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n\n.type-option.active {\n  background: #3b82f6;\n  color: white;\n  border-color: #2563eb;\n}\n\n/* Selector and Attribute blocks */\n.selector-block,\n.attribute-block {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  position: relative;\n}\n\n.selector-header,\n.attribute-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n.selector-title,\n.attribute-title {\n  font-size: 14px;\n  font-weight: 600;\n  color: #374151;\n}\n\n.remove-selector-btn,\n.remove-attribute-btn {\n  background: transparent;\n  border: none;\n  color: #ef4444;\n  cursor: pointer;\n  padding: 4px;\n  transition: all 0.2s ease;\n  border-radius: 4px;\n}\n\n.remove-selector-btn:hover,\n.remove-attribute-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  transform: scale(1.1);\n}\n\n.remove-selector-btn-hide,\n.remove-attribute-btn-hide {\n  display: none;\n}\n\n.page-pattern-container {\n  display: flex;\n  gap: 8px;\n}\n\n.pattern-operator {\n  flex: 0 0 140px;\n}\n\n.pattern-value {\n  flex: 1;\n}\n\n.attribute-fields {\n  display: flex;\n  gap: 8px;\n}\n\n.attribute-name-field {\n  flex: 0 0 180px;\n}\n\n.attribute-value-field {\n  flex: 1;\n}\n\n.add-selector-btn,\n.add-attribute-btn {\n  width: 100%;\n  padding: 10px;\n  background: transparent;\n  border: 2px dashed #cbd5e1;\n  border-radius: 6px;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n\n.add-selector-btn:hover,\n.add-attribute-btn:hover {\n  border-color: #3b82f6;\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.05);\n}\n\n/* Form actions */\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 8px;\n  padding-bottom: 0px;\n  border-top: 1.5px solid #e5e7eb;\n  flex-shrink: 0;\n  position: sticky;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 10;\n  background: #ffffff;\n}\n\n#prev-step-btn,\n#next-step-btn {\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  height: 40px;\n  transition: all 0.25s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  min-width: 120px;\n}\n\n#prev-step-btn {\n  background: white;\n  border: 1.5px solid #e5e7eb;\n  color: #4b5563;\n}\n\n#prev-step-btn:hover {\n  background: #f9fafb;\n  border-color: #9ca3af;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n\n#next-step-btn {\n  background: #2563eb;\n  color: white;\n  border: 1.5px solid #1d4ed8;\n  font-weight: 600;\n  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);\n  position: relative;\n  overflow: hidden;\n}\n\n#next-step-btn:hover {\n  background: #1d4ed8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);\n}\n\n/* Loading spinner */\n.spinner {\n  animation: rotate 1s linear infinite;\n  display: inline-block;\n  margin-right: 8px;\n}\n\n.spinner circle:last-child {\n  stroke-dasharray: 62.83;\n  stroke-dashoffset: 62.83;\n  animation: dash 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n}\n\n@keyframes rotate {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes dash {\n  0% {\n    stroke-dashoffset: 62.83;\n  }\n  50% {\n    stroke-dashoffset: 15.71;\n  }\n  100% {\n    stroke-dashoffset: 62.83;\n  }\n}\n\n/* Toast Notifications */\n.toast-container {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  z-index: 100000;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  pointer-events: none;\n}\n\n.toast-message {\n  min-width: 300px;\n  max-width: 400px;\n  padding: 14px 18px;\n  border-radius: 10px;\n  font-weight: 500;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  pointer-events: auto;\n  animation: toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n  backdrop-filter: blur(10px);\n  line-height: 1.4;\n}\n\n.toast-message::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%;\n  background: currentColor;\n  opacity: 0.8;\n}\n\n.toast-icon {\n  flex-shrink: 0;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.toast-content {\n  flex: 1;\n  word-wrap: break-word;\n}\n\n.toast-close {\n  flex-shrink: 0;\n  width: 20px;\n  height: 20px;\n  background: transparent;\n  border: none;\n  color: currentColor;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s ease;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.toast-close:hover {\n  opacity: 1;\n}\n\n.toast-message.success {\n  background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%);\n  color: white;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.toast-message.error {\n  background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);\n  color: white;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.toast-message.info {\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);\n  color: white;\n  border: 1px solid rgba(59, 130, 246, 0.3);\n  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.toast-message.warning {\n  background: linear-gradient(135deg, rgba(251, 146, 60, 0.95) 0%, rgba(249, 115, 22, 0.95) 100%);\n  color: white;\n  border: 1px solid rgba(251, 146, 60, 0.3);\n  box-shadow: 0 4px 20px rgba(251, 146, 60, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.toast-progress {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 3px;\n  background: rgba(255, 255, 255, 0.3);\n  animation: toastProgress 5s linear;\n  transform-origin: left;\n}\n\n@keyframes toastSlideIn {\n  from {\n    opacity: 0;\n    transform: translateX(100%);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes toastSlideOut {\n  from {\n    opacity: 1;\n    transform: translateX(0);\n  }\n  to {\n    opacity: 0;\n    transform: translateX(100%);\n  }\n}\n\n@keyframes toastProgress {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n\n/* Error states */\n.field-error-message {\n  color: #dc2626;\n  font-size: 12px;\n  margin-top: 4px;\n  animation: slideIn 0.2s ease;\n}\n\ninput.error,\nselect.error {\n  border-color: #ef4444 !important;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;\n  animation: shake 0.3s ease;\n}\n\n@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-4px); }\n  75% { transform: translateX(4px); }\n}\n\n/* Disabled states */\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\nbutton:disabled:hover {\n  transform: none !important;\n  box-shadow: none !important;\n}\n\n.border-none {\n  border: none !important;\n}\n\n.toolbar-left {\n  flex-grow: 1;\n}\n\n.toolbar-right {\n  gap: 8px;\n}\n\n/* Responsive adjustments for small screen heights */\n@media (max-height: 700px) {\n  .inspector-toolbar-wrapper {\n    max-height: 85vh;\n  }\n  \n  .inspector-toolbar-wrapper:not(.collapsed) {\n    max-height: 85vh;\n  }\n  \n  .custom-event-form-container {\n    max-height: calc(85vh - 90px);\n  }\n  \n  .stepper-progress {\n    margin-bottom: 15px;\n  }\n  \n  .stepper-header {\n    padding-bottom: 8px;\n    margin-bottom: 6px;\n  }\n  \n  .form-group-row,\n  .form-group-row-split {\n    margin-bottom: 12px;\n  }\n  \n  .stepper-content {\n    padding-bottom: 12px;\n  }\n}\n\n@media (max-height: 600px) {\n  .inspector-toolbar-wrapper {\n    max-height: 80vh;\n  }\n  \n  .inspector-toolbar-wrapper:not(.collapsed) {\n    max-height: 80vh;\n  }\n  \n  .custom-event-form-container {\n    max-height: calc(80vh - 80px);\n    padding: 12px 8px;\n    padding-bottom: 0;\n  }\n  \n  .stepper-progress {\n    margin-bottom: 12px;\n  }\n  \n  .stepper-header {\n    padding-bottom: 6px;\n    margin-bottom: 4px;\n  }\n  \n  .stepper-title {\n    font-size: 15px;\n  }\n  \n  .step-number {\n    width: 28px;\n    height: 28px;\n    font-size: 12px;\n  }\n  \n  .step-label {\n    font-size: 11px;\n  }\n  \n  .form-group-row,\n  .form-group-row-split {\n    margin-bottom: 10px;\n  }\n  \n  .form-group-row label,\n  .form-group-half label {\n    font-size: 13px;\n    margin-bottom: 4px;\n  }\n  \n  #custom-event-form input,\n  #custom-event-form select {\n    height: 36px;\n    padding: 8px 10px;\n    font-size: 13px;\n  }\n  \n  .stepper-content {\n    padding-bottom: 10px;\n  }\n  \n  #prev-step-btn,\n  #next-step-btn,\n  #cancel-btn {\n    height: 36px;\n    font-size: 13px;\n    padding: 6px 14px;\n  }\n}\n\n@media (max-height: 500px) {\n  .inspector-toolbar-wrapper {\n    max-height: 75vh;\n  }\n  \n  .inspector-toolbar-wrapper:not(.collapsed) {\n    max-height: 75vh;\n  }\n  \n  .custom-event-form-container {\n    max-height: calc(75vh - 50px);\n    padding: 10px 6px;\n    overflow-y: auto;\n    padding-bottom: 0;\n  }\n  \n  .stepper-progress {\n    margin-bottom: 10px;\n  }\n  \n  .stepper-connector {\n    margin: 0 8px;\n  }\n  \n  .step-number {\n    width: 24px;\n    height: 24px;\n    font-size: 11px;\n    margin-bottom: 4px;\n  }\n  \n  .form-group-row,\n  .form-group-row-split {\n    margin-bottom: 8px;\n  }\n  \n  #custom-event-form input,\n  #custom-event-form select {\n    height: 32px;\n    padding: 6px 8px;\n  }\n  \n  .selector-block,\n  .attribute-block {\n    padding: 12px;\n  }\n  \n  .stepper-content {\n    padding-bottom: 8px;\n  }\n  \n  .form-actions {\n    padding: 8px 12px 4px;\n    padding-bottom: 0;\n  }\n  \n  #prev-step-btn,\n  #next-step-btn,\n  #cancel-btn {\n    height: 32px;\n    font-size: 12px;\n    padding: 4px 12px;\n    min-width: 80px;\n  }\n}\n`;\n\n//# sourceURL=webpack://InspectorToolbar/./src/shadow-styles.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("29105c48b525313469aa")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "InspectorToolbar:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 		
/******/ 			var onAccepted = function () {
/******/ 				return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 					// handle errors in accept handlers and self accepted module load
/******/ 					if (error) {
/******/ 						return setStatus("fail").then(function () {
/******/ 							throw error;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					if (queuedInvalidatedModules) {
/******/ 						return internalApply(options).then(function (list) {
/******/ 							outdatedModules.forEach(function (moduleId) {
/******/ 								if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 							});
/******/ 							return list;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					return setStatus("idle").then(function () {
/******/ 						return outdatedModules;
/******/ 					});
/******/ 				});
/******/ 			};
/******/ 		
/******/ 			return Promise.all(
/******/ 				results
/******/ 					.filter(function (result) {
/******/ 						return result.apply;
/******/ 					})
/******/ 					.map(function (result) {
/******/ 						return result.apply(reportError);
/******/ 					})
/******/ 			)
/******/ 				.then(function (applyResults) {
/******/ 					applyResults.forEach(function (modules) {
/******/ 						if (modules) {
/******/ 							for (var i = 0; i < modules.length; i++) {
/******/ 								outdatedModules.push(modules[i]);
/******/ 							}
/******/ 						}
/******/ 					});
/******/ 				})
/******/ 				.then(onAccepted);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		this["webpackHotUpdateInspectorToolbar"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					var acceptPromises = [];
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									var result;
/******/ 									try {
/******/ 										result = callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 									if (result && typeof result.then === "function") {
/******/ 										acceptPromises.push(result);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					var onAccepted = function () {
/******/ 						// Load self accepted modules
/******/ 						for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 							var item = outdatedSelfAcceptedModules[o];
/******/ 							var moduleId = item.module;
/******/ 							try {
/******/ 								item.require(moduleId);
/******/ 							} catch (err) {
/******/ 								if (typeof item.errorHandler === "function") {
/******/ 									try {
/******/ 										item.errorHandler(err, {
/******/ 											moduleId: moduleId,
/******/ 											module: __webpack_require__.c[moduleId]
/******/ 										});
/******/ 									} catch (err1) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "self-accept-error-handler-errored",
/******/ 												moduleId: moduleId,
/******/ 												error: err1,
/******/ 												originalError: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err1);
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								} else {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					};
/******/ 		
/******/ 					return Promise.all(acceptPromises)
/******/ 						.then(onAccepted)
/******/ 						.then(function () {
/******/ 							return outdatedModules;
/******/ 						});
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index-shadow.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});