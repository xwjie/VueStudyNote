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

{
  warn = function warn(msg) {
    console.error('[Xiao warn]: ' + msg);
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

// D:\OutPut\VUE\vue\src\core\instance\index.js

var Xiao = function Xiao(options) {
  classCallCheck(this, Xiao);

  if ("development" !== 'production' && !(this instanceof Xiao)) {
    warn('Xiao is a constructor and should be called with the `new` keyword');
  }

  console.log('main start', options);
};

return Xiao;

})));
