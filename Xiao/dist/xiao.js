(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Xiao = factory());
}(this, (function () { 'use strict';

// copy from D:\OutPut\VUE\vue\src\shared\util.js

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop(a, b, c) {}

//copy from D:\OutPut\VUE\vue\src\core\util\debug.js

var warn = noop;
var log = noop;

{
  warn = function warn(msg) {
    console.error('[Xiao warn]: ' + msg);
  };

  log = console.log;
}

// D:\OutPut\VUE\vue\src\core\instance\lifecycle.js
function mountComponent(vm, el, hydrating) {}
// export function mountComponent(
//     vm: Xiao,
//     el: ?Element,
//     hydrating?: boolean
// ): Xiao {
//     vm.$el = el
// }

// D:\OutPut\VUE\vue\src\platforms\web\util\index.js

/**
 * Query an element selector if it's not an element already.
 */

// D:\OutPut\VUE\vue\src\platforms\web\util\index.js
function query(el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
            "development" !== 'production' && warn('Cannot find element: ' + el);
            return document.createElement('div');
        }
        return selected;
    } else {
        return el;
    }
}

// D:\OutPut\VUE\vue\src\platforms\web\entry-runtime-with-compiler.js
function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML;
    } else {
        var container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}

// export function query (el: string | Element): Element {
//     if (typeof el === 'string') {
//       const selected = document.querySelector(el)
//       if (!selected) {
//         "development" !== 'production' && warn(
//           'Cannot find element: ' + el
//         )
//         return document.createElement('div')
//       }
//       return selected
//     } else {
//       return el
//     }
//   }

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

// D:\OutPut\VUE\vue\src\core\instance\index.js

// 
var uid = 100;

//fixme
var inBrowser = true;

var Xiao = function () {
  function Xiao(options) {
    classCallCheck(this, Xiao);

    if ("development" !== 'production' && !(this instanceof Xiao)) {
      warn('Xiao is a constructor and should be called with the `new` keyword');
    }

    this.$options = options || {};
    this._uid = uid++;

    log('main start', this);

    this._init(this.$options);
  }
  //properties


  createClass(Xiao, [{
    key: '$mount',
    value: function $mount(el, hydrating) {
      var element = query(el);

      if (!this.$options.template) {
        this.$options.template = getOuterHTML(element);
      }

      if (!this.$options.template && !element) {
        warn("options.el && options.template all null");
        return;
      }

      this.$el = element;
      log('$mount', this);

      return mountComponent(this, element, hydrating);
    }
  }, {
    key: '_init',
    value: function _init(options) {
      var el = options.el;

      if (el && inBrowser) {
        this.$mount(el);
      }
    }
  }]);
  return Xiao;
}();

return Xiao;

})));
