(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Xiao = factory());
}(this, (function () { 'use strict';

// src/foo.js
var foo = 'hello world!';

// src/main.js
var mainBabel = (function () {
  return console.log(foo);
});

return mainBabel;

})));
