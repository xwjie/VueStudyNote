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

//�ο� D:\OutPut\VUE\vue\src\core\util\debug.js

var warn = noop;

{
  warn = function warn(msg) {
    console.error('[Xiao warn]: ' + msg);
  };
}

// D:\OutPut\VUE\vue\src\core\instance\index.js

function Xiao(options) {
  if ("development" !== 'production' && !(this instanceof Xiao)) {
    warn('Xiao is a constructor and should be called with the `new` keyword');
  }

  console.log('main start', options);
}

return Xiao;

})));
