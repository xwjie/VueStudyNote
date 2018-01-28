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

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

//copy from D:\OutPut\VUE\vue\src\core\util\debug.js

var warn = noop;
var log = noop;
var logstart = noop;
var logend = noop;
var error = noop;

{
  error = warn = function warn(msg) {
    console.error('[Xiao warn]: ' + msg);
  };

  log = console.log;
  logstart = console.group;
  logend = console.groupEnd;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var isFunction = function isFunction(f) {
  return typeof f == 'function';
};

// D:\OutPut\VUE\vue\src\shared\util.js
/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
* Remove an item from an array
*/
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

// copy D:\OutPut\VUE\vue\src\core\util\lang.js

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc = void 0;
var macroTimerFunc = void 0;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function macroTimerFunc() {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function macroTimerFunc() {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function macroTimerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function microTimerFunc() {
    p.then(flushCallbacks);
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */


function nextTick(cb, ctx) {
  log('nextTick', cb);

  var _resolve = void 0;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        console.log('nextTick', e);
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}

var array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}

function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
var htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};

function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode$$1) {
    return vnode$$1.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmlDomApi;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode$$1, insertedVnodeQueue) {
        var i, data = vnode$$1.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode$$1);
                data = vnode$$1.data;
            }
        }
        var children = vnode$$1.children, sel = vnode$$1.sel;
        if (sel === '!') {
            if (isUndef(vnode$$1.text)) {
                vnode$$1.text = '';
            }
            vnode$$1.elm = api.createComment(vnode$$1.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode$$1.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode$$1);
            if (array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (primitive(vnode$$1.text)) {
                api.appendChild(elm, api.createTextNode(vnode$$1.text));
            }
            i = vnode$$1.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode$$1);
                if (i.insert)
                    insertedVnodeQueue.push(vnode$$1);
            }
        }
        else {
            vnode$$1.elm = api.createTextNode(vnode$$1.text);
        }
        return vnode$$1.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode$$1) {
        var i, j, data = vnode$$1.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode$$1);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode$$1);
            if (vnode$$1.children !== undefined) {
                for (j = 0; j < vnode$$1.children.length; ++j) {
                    i = vnode$$1.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
            }
            else {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
            }
        }
    }
    function patchVnode(oldVnode, vnode$$1, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode$$1.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode$$1);
        }
        var elm = vnode$$1.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode$$1.children;
        if (oldVnode === vnode$$1)
            return;
        if (vnode$$1.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode$$1);
            i = vnode$$1.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode$$1);
        }
        if (isUndef(vnode$$1.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode$$1.text) {
            api.setTextContent(elm, vnode$$1.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode$$1);
        }
    }
    return function patch(oldVnode, vnode$$1) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode$$1)) {
            patchVnode(oldVnode, vnode$$1, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode$$1, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode$$1.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode$$1;
    };
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _class = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;

});

var _class$1 = unwrapExports(_class);
var _class_1 = _class.classModule;

var props = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
exports.default = exports.propsModule;

});

var props$1 = unwrapExports(props);
var props_1 = props.propsModule;

var style = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed' && style.delayed) {
            for (var name2 in style.delayed) {
                cur = style.delayed[name2];
                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                    setNextFrame(elm.style, name2, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
exports.styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
exports.default = exports.styleModule;

});

var style$1 = unwrapExports(style);
var style_1 = style.styleModule;

function updateDirective(oldVnode, vnode) {
  var nodeDirs = vnode.data.directives;

  // 没有指令
  if (!nodeDirs || nodeDirs.length == 0) {
    return;
  }

  console.log('自定义指令处理：', nodeDirs);

  var vm = vnode.context;
  var dirs = vm.directives;

  nodeDirs.forEach(function (dir) {
    // 调用指令的处理函数。
    // fixme 应该判断一下，旧的指令的value和新的指令的value是否相同，不相同才调用
    dirs[dir.name].call(window, vnode.elm, dir, vnode, oldVnode);
    //dirs[dir.name].call(vm, vnode.elm, dir, vnode, oldVnode)
  }, vm);
}

var directive = {
  create: updateDirective,
  update: updateDirective
};

function updateDirective$1(vnode) {
  var sel = vnode.data.sel;

  log('create-component', sel);

  if ('todo-item' == sel) {
    log('是组件');
  }

  var Comp = Xiao.component(sel);

  log('组件', Comp);

  var comp = vnode.componentInstance = new Comp();

  comp.$mount(vnode.elm);
}

var createComponent = {
  init: updateDirective$1
  //update: updateDirective
};

var eventlisteners = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (typeof handler === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            }
            else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        }
        else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i]);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type, on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        }
        else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        }
        else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
exports.eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};
exports.default = exports.eventListenersModule;

});

var eventlisteners$1 = unwrapExports(eventlisteners);
var eventlisteners_1 = eventlisteners.eventListenersModule;

var vnode_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;

});

unwrapExports(vnode_1);
var vnode_2 = vnode_1.vnode;

var is = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;

});

unwrapExports(is);
var is_1 = is.array;
var is_2 = is.primitive;

var h_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;

exports.default = h;

});

var h$3 = unwrapExports(h_1);
var h_2 = h_1.h;

var patch = init([// Init patch function with chosen modules
_class$1, // makes it easy to toggle classes
props$1, // for setting properties on DOM elements
style$1, // handles styling on elements with support for animations
eventlisteners$1, // attaches event listeners
directive, // xiaowenjie add 处理指令
createComponent] // xiaowenjie 创建插件
);

var h = h$3; // helper function for creating vnodes

var uid$1 = 0;

/**
 *  Dep （Dependent），表示：被观察对象。
 *
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function () {
  function Dep() {
    classCallCheck(this, Dep);

    this.id = uid$1++;
    this.subs = [];

    log('[Dep] _INIT_ ');
  }
  // 在watcher里面调用render函数的时候会有值，其他时候为空


  createClass(Dep, [{
    key: 'addSub',
    value: function addSub(sub) {
      this.subs.push(sub);
    }
  }, {
    key: 'removeSub',
    value: function removeSub(sub) {
      remove(this.subs, sub);
    }
  }, {
    key: 'depend',
    value: function depend() {
      if (Dep.target) {
        Dep.target.addDep(this);
      }
    }
  }, {
    key: 'notify',
    value: function notify() {
      // stabilize the subscriber list first
      var subs = this.subs.slice();
      for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
      }
    }
  }]);
  return Dep;
}();

Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

// D:\OutPut\VUE\vue\src\core\observer\index.js

var Observer = function () {
  function Observer(value) {
    classCallCheck(this, Observer);

    log('[observer] __INIT__ , vlaue:', value);

    this.value = value;
    this.dep = new Dep();

    this.walk(value);
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */


  createClass(Observer, [{
    key: 'walk',
    value: function walk(obj) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]]);
      }
    }
  }]);
  return Observer;
}();

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value)) {
    // fixme  || value instanceof VNode
    return;
  }
  var ob = void 0;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
  // observerState.shouldConvert &&
  (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value)) {
    ob = new Observer(value);
  }

  // fixme
  // if (asRootData && ob) {
  // ob.vmCount++
  // }

  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, shallow) {
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  }

  // xwjie 这里应该可以考虑优化，如果和模板没有关系，dep不需要创建
  var dep = new Dep();

  log('[observer]\u5B9A\u4E49\u89C2\u5BDF\u8005\uFF0C\u5C5E\u6027\uFF1A' + key);

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  // 监听子属性
  var childOb = observe(val);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // log('[observer]get方法被调用，属性：' + key)
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        // 子属性的依赖关系也要登记起来
        if (childOb) {
          childOb.dep.depend();
        }
      }

      return value;
    },

    set: function reactiveSetter(newVal) {
      // log('[observer]set方法被调用，属性：' + key)
      var value = getter ? getter.call(obj) : val;

      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      // 监听新设置进来的数据
      childOb = observe(newVal); //!shallow &&

      dep.notify();
    }
  });
}

// D:\OutPut\VUE\vue\src\core\util\env.js
var _Set = void 0;

/* istanbul ignore if */ // $flow-disable-line
// if (typeof Set !== 'undefined') {
//   // use native Set when available.
//   _Set = Set
// } else {
// a non-standard Set polyfill that only works with primitive keys.
_Set = function () {
  function Set() {
    classCallCheck(this, Set);

    this.set = Object.create(null);
  }

  createClass(Set, [{
    key: "has",
    value: function has(key) {
      return this.set[key] === true;
    }
  }, {
    key: "add",
    value: function add(key) {
      this.set[key] = true;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.set = Object.create(null);
    }
  }]);
  return Set;
}();

// 当前已有的id队列
var has = {};

// 队列
var queue = [];

// 是否等待刷新
var waiting = false;

function flushSchedulerQueue() {
  logstart('flushSchedulerQueue, queue size: ' + queue.length);
  var watcher = void 0,
      id = void 0;
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (var index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.get();
  }

  // 清空
  queue.length = 0;

  waiting = false;

  logend();
}

function queueWatcher(watcher) {
  var id = watcher.id;
  log('queueWatcher', id);

  // 队列里面没有
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);
  }

  // 防止重复提交
  if (!waiting) {
    waiting = true;
    nextTick(flushSchedulerQueue);
  }
}

var uid$2 = 0;

var Watcher = function () {

  /**
   *
   * @param {*} vm
   * @param {*} option
   *  getter: 函数，为render函数或者属性的get函数
   *  cb ： 回调函数，可以为空
   */
  function Watcher(vm, option) {
    classCallCheck(this, Watcher);

    this.vm = vm;
    this.id = ++uid$2;

    this.getter = option.getter;
    this.cb = option.cb;

    this.depIds = new _Set();

    log('[Watcher' + this.id + '] _INIT_');

    this.get();
  }

  createClass(Watcher, [{
    key: 'get',
    value: function get$$1() {
      try {
        pushTarget(this);
        var value = this.getter.call(this.vm, this.vm);

        // 监控属性的时候，回调不为空
        if (this.cb) {
          var oldValue = this.value;

          if (value !== oldValue) {
            try {
              this.cb.call(this.vm, value, oldValue);
            } catch (error) {}
          }
        }

        // 保存最新值
        this.value = value;
      } finally {
        popTarget();
      }
    }

    /**
    * Add a dependency to this directive.
    */

  }, {
    key: 'addDep',
    value: function addDep(dep) {
      if (!this.depIds.has(dep.id)) {
        dep.addSub(this);
        this.depIds.add(dep.id);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      log('[Watcher' + this.id + '] update');

      // fixme
      // this.get();
      // 放队列里面执行
      queueWatcher(this);
    }
  }]);
  return Watcher;
}();

//D:\OutPut\VUE\vue\src\core\instance\state.js

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  //if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods);

  initData(vm);
  initComputed(vm);

  //initProps(vm)

  // 必须在data和computed之后
  if (opts.watch) initWatch(vm, opts.watch);
}

/**
 * 监听data
 * @param {*} vm
 */
function initData(vm) {
  var data = vm.$options.data;

  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;

  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if (!isReserved(key)) {
      // 这里才是真正的代理数据
      proxy(vm, '_data', key);
    }
  }

  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  try {
    return data.call(vm, vm);
  } catch (e) {
    warn("get data error:", e);
    return {};
  }
}

/**
 * 监听计算属性
 *
 * @param {*} vm
 */
function initComputed(vm) {
  var computed = vm.$options.computed;

  //let watchers = vm._watcherCompued = Object.create(null)

  if (!computed) {
    return;
  }

  var _loop = function _loop(key) {
    var getter = computed[key];

    var dep = new Dep();

    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        var value = getter.call(vm);

        if (Dep.target) {
          dep.depend();
        }

        return value;
      }
    });
  };

  for (var key in computed) {
    _loop(key);
  }
}

function initProps(vm, propsData) {
  var propsOptions = vm.$options.props;

  if (!propsOptions) {
    return;
  }

  log('initProps propsOptions', propsOptions);
  log('initProps propsData', propsData);

  var props = vm._props = {};

  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;

  // root instance props should be converted
  // fixme observerState.shouldConvert = isRoot

  for (var i = 0; i < propsOptions.length; i++) {
    var key = propsOptions[i];

    keys.push(key);

    // fixme
    //const value = validateProp(key, propsOptions, propsData, vm)

    var value = propsData[key];

    log('\u6CE8\u518Cprops\u5C5E\u6027\uFF1A' + key + ', \u503C\uFF1A' + value);

    defineReactive(props, key, value);

    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, '_props', key);
    }
  }
}

/**
 * 更新子组件的props属性，就是直接赋值一次
 *
 * @param {*} vm
 * @param {*} propsData
 */
function updateProps(vm, propsData) {
  log('updateProps propsData', propsData);
  extend(vm, propsData);
}

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function initMethods(vm, methods) {
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    vm.$watchField(key, watch[key]);
  }
}

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

/**
 * 绑定事件
 *
 * @param {*} vm
 * @param {*} on
 */
function initEvent(vm, on) {
  log('initEvent', on);
  vm._events = on;
}

// D:\OutPut\VUE\vue\src\core\instance\lifecycle.js
function mountComponent(vm, hydrating) {
  // 产生一个代理对象（VUE开发环境会使用Proxy产生一个代理对象，发布环境就是vue对象自己）
  // 调用生成的render函数绑定的this就是它。（whth(this)）
  vm._renderWatcher = new Watcher(vm, { getter: updateComponent });
}

/**
 * 渲染组件
 *
 * @param {*} vm
 */
function updateComponent(vm) {
  var proxy$$1 = vm;

  // 虚拟dom里面的创建函数
  proxy$$1.h = h;

  // 新的虚拟节点
  // 指令的信息已经自动附带再vnode里面
  var vnode = vm.$render.call(proxy$$1, h);

  log('before expandSlotArray: ', vnode);

  // 插槽渲染函数_t执行后，child里面应该为节点的可能变成了数组，所以要打算处理一下
  expandSlotArray(vnode);

  log('after expandSlotArray: ', vnode);

  // 把实例绑定到vnode中，处理指令需要用到
  setContext(vnode, vm);

  // 处理子组件
  setComponentHook(vnode, vm);

  // 上一次渲染的虚拟dom
  var preNode = vm.$options.oldvnode;

  log('[lifecycle][uid:' + vm._uid + '] \u7B2C' + ++vm._renderCount + '\u6B21\u6E32\u67D3');

  if (preNode) {
    vnode = patch(preNode, vnode);
  } else {
    vnode = patch(vm.$el, vnode);
  }

  log('vnode', vnode);

  // 保存起来，下次patch需要用到
  vm.$options.oldvnode = vnode;
}

/**
 * [递归设置] 如果当前节点有指令，增设置context到当前节点
 * 注意: vue不是这样实现的，vue只有根节点有context
 * @param {*} vnode
 * @param {*} vm
 */
function setContext(vnode, vm) {
  // 如果当前节点有指令，设置context
  if (!vnode.context) {
    if (vnode.data && vnode.data.directives) {
      vnode.context = vm;
    }
  }

  if (vnode.children) {
    vnode.children.forEach(function (e) {
      setContext(e, vm);
    }, this);
  }
}

/**
 * 实现组件功能
 *
 * 采用snabbdom的hook，在insert和update的时候更新数据。
 *
 * @param {*} vnode
 * @param {*} vm
 */
function setComponentHook(vnode, vm) {
  if (!vnode.sel) {
    return;
  }

  // 查看是否组成了组件？
  var Comp = Xiao.component(vnode.sel);

  if (Comp) {
    vnode.data.hook = {
      insert: function insert(vnode) {
        log('component vnode', vnode);

        // 创建子组件实例
        var app = new Comp();
        app.$parent = vm;

        var propsData = vnode.data.props;

        // 把计算后的props数据代理到当前vue里面
        initProps(app, propsData);

        // 处理插槽，把插槽归类
        resolveSlots(app, vnode.children);

        // 绑定事件
        if (vnode.data.on) {
          initEvent(app, vnode.data.on);
        }

        // 保存到vnode中，更新的时候需要取出来用
        vnode.childContext = app;

        // 渲染
        app.$mount(vnode.elm);
      },
      update: function update(oldvnode, vnode) {
        var app = oldvnode.childContext;

        // 更新update属性
        updateProps(app, vnode.data.props);

        vnode.childContext = app;
      }

    };
  }

  // 递归
  if (vnode.children) {
    vnode.children.forEach(function (e) {
      setComponentHook(e, vm);
    }, this);
  }
}

/**
 * 归类插槽
 *
 * @param {*} vm
 * @param {*} children
 */
function resolveSlots(vm, children) {
  log('resolveSlots[插槽分类]', children);

  vm.$slots = {};

  children.forEach(function (vnode) {
    var slotname = 'default';

    if (vnode.data.props && vnode.data.props.slot) {
      slotname = vnode.data.props.slot;
      delete vnode.data.props.slot;
    }

    (vm.$slots[slotname] || (vm.$slots[slotname] = [])).push(vnode);
  });

  log('resolveSlots[插槽分类] end', vm.$slots);
}

function expandSlotArray(vnode) {
  var children = vnode.children;

  if (!children) return;

  for (var i = 0; i < children.length; i++) {
    // 把对应位置的数组打散
    if (Array.isArray(children[i])) {
      children.splice.apply(children, [i, 1].concat(toConsumableArray(children[i])));
    }

    // 单独处理纯文本，包装为对象，否则会出错
    if (typeof children[i] == 'string') {
      children[i] = {
        text: children[i]
      };
    }
  }
}

/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

// Regular Expressions for parsing tags and attributes
// xiaowenjie modify 增加制定
//var startTag = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_@:.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 4.01
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

// Block Elements - HTML 4.01
var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

// Inline Elements - HTML 4.01
var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("script,style");

var HTMLParser = function HTMLParser(html, handler) {
  var index,
      chars,
      match,
      stack = [],
      last = html;
  stack.last = function () {
    return this[this.length - 1];
  };

  while (html) {
    chars = true;

    // Make sure we're not in a script or style element
    if (!stack.last() || !special[stack.last()]) {

      // Comment
      if (html.indexOf("<!--") == 0) {
        index = html.indexOf("-->");

        if (index >= 0) {
          if (handler.comment) handler.comment(html.substring(4, index));
          html = html.substring(index + 3);
          chars = false;
        }

        // end tag
      } else if (html.indexOf("</") == 0) {
        match = html.match(endTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        }

        // start tag
      } else if (html.indexOf("<") == 0) {
        match = html.match(startTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }

      if (chars) {
        index = html.indexOf("<");

        var text = index < 0 ? html : html.substring(0, index);
        html = index < 0 ? "" : html.substring(index);

        if (handler.chars) handler.chars(text);
      }
    } else {
      html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function (all, text) {
        text = text.replace(/<!--(.*?)-->/g, "$1").replace(/<!\[CDATA\[(.*?)]]>/g, "$1");

        if (handler.chars) handler.chars(text);

        return "";
      });

      parseEndTag("", stack.last());
    }

    if (html == last) throw "Parse Error: " + html;
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag("", stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag("", tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
        });
      });

      if (handler.start) handler.start(tagName, attrs, unary);
    }
  }

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) var pos = 0;

    // Find the closest opened tag of the same type
    else for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] == tagName) break;
      }if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) handler.end(stack[i]);
      } // Remove the open elements from the stack
      stack.length = pos;
    }
  }
};





function makeMap(str) {
  var obj = {},
      items = str.split(",");
  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }return obj;
}

//D:\OutPut\VUE\vue\src\compiler\parser\text-parser.js
function parseText(text, re) {
  if (!re.test(text)) {
    return;
  }
  var tokens = [];
  var lastIndex = re.lastIndex = 0;
  var match = void 0,
      index = void 0,
      tokenValue = void 0;
  while (match = re.exec(text)) {
    index = match.index;

    // push text token
    if (index > lastIndex) {
      tokenValue = text.slice(lastIndex, index);
      tokens.push(JSON.stringify(tokenValue));
    }

    // tag token
    var exp = match[1].trim();
    tokens.push(createExpressStr(exp));

    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokenValue = text.slice(lastIndex);
    tokens.push(JSON.stringify(tokenValue));
  }

  return {
    expression: tokens.join('+')
  };
}

/**
 * 处理filter表达式
 * 如：message | capitalize | wrap('===')
 * @param {*} exp
 */
function createExpressStr(exp) {
  // 数组反转，然后递归生成嵌套函数调用表达式
  return wrapExpressStr(exp.split('|').reverse());
}

function wrapExpressStr(arr) {
  var str = arr[0].trim();

  if (arr.length == 1) {
    return str;
  }

  // 如果是有参数的filter, 如 wrap('===')
  var i = str.indexOf('(');

  if (i == -1) {
    return '_f("' + str + '")(' + wrapExpressStr(arr.slice(1)) + ')';
  } else {
    return '_f("' + str.substr(0, i) + '")(' + wrapExpressStr(arr.slice(1)) + ',' + str.substr(i + 1);
  }
}

var argRE = /:(.*)$/;
var modifierRE = /\.[^.]+/g;

/**
 * 处理html parser 生成的属性信息
 *
 * @param {*} el
 * @param {*} attrs
 */
function processAttrs(el, attrs) {

  var i = void 0,
      l = void 0,
      name = void 0,
      rawName = void 0,
      value = void 0,
      modifiers = void 0;

  for (i = 0, l = attrs.length; i < l; i++) {
    name = rawName = attrs[i].name;
    value = attrs[i].value;

    // modifiers
    modifiers = parseModifiers(name);
    if (modifiers) {
      name = name.replace(modifierRE, '');
    }

    // parse arg
    var argMatch = name.match(argRE);
    var arg = argMatch && argMatch[1];
    if (arg) {
      name = name.slice(0, -(arg.length + 1));
    }

    // 是指令
    if (isDirective(name)) {
      addDirective(el, name, rawName, value, arg, modifiers);
    }
  }
}

/**
 * 如果是'x-'开头的就是指令
 *
 * @param {*} name
 */
function isDirective(name) {
  return name.startsWith('x-');
}

/**
 * 返回一个map
 *
 * @param {*} name
 */
function parseModifiers(name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) {
      ret[m.slice(1)] = true;
    });
    return ret;
  }
}

/**
 * 增加指令信息
 *
 * @param {*} el
 * @param {*} name
 * @param {*} rawName
 * @param {*} value
 * @param {*} arg
 * @param {*} modifiers
 */
function addDirective(el, name, rawName, value, arg, modifiers) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

//D:\OutPut\VUE\vue\src\compiler\parser\index.js
function html2ast(templte) {
  var root = void 0;
  var parent = void 0;
  var parentStack = [];

  log('temlate', templte);

  HTMLParser(templte, {
    start: function start(tag, attrs, unary) {
      //
      if (false === unary && parent) {
        parentStack.push(parent);
      }

      var e = createASTElement(tag, attrs, parent);

      if (!root) {
        root = e;
      }

      if (false === unary) {
        parent = e;
      }
    },
    end: function end(tag) {
      parent = parentStack.pop();
    },
    chars: function chars(text) {
      if (text = text.trim()) {
        createTextlement(text, parent);
      }
    },
    comment: function comment(text) {
      createCommentlement(text, parent);
    }
  });

  log('htmlparser ast', root);
  log('htmlparser parentStack', parentStack);
  return root;
}

function createASTElement(tag, attrs, parent) {
  var e = {
    type: 1,
    tag: tag,
    //attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    //parent,
    children: []

    // 解析属性（指令等）
  };processAttrs(e, attrs);

  if (parent) {
    parent.children.push(e);
  }

  return e;
}

function createTextlement(text, parent) {
  var res = parseText(text, defaultTagRE);

  if (res) {
    text = res.expression;
  } else {
    text = JSON.stringify(text);
  }

  var e = {
    type: 3,
    text: text
    //parent
  };

  parent.children.push(e);

  return e;
}

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;

function createCommentlement(text, parent) {
  var e = {
    type: 3,
    text: text,
    isComment: true
    //parent
  };

  parent.children.push(e);

  return e;
}

function makeAttrsMap(attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map;
}

// D:\OutPut\VUE\vue\src\compiler\codegen\index.js
function ast2render(ast) {
  var renderStr = '';

  /*
  产生类似这样的snabbdom函数字符串
  h('div#container.two.classes', { on: { click: someFn } }, [
      h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
      h('h1', strVar),
      'this is string',
      h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
  ])
  */

  if (ast) {
    log('ast', ast);
    renderStr = createRenderStr(ast);
  }

  log('[ast2render]\u865A\u62DFdom\u51FD\u6570\u5B57\u7B26\u4E32:' + renderStr);

  return renderStr;
}

function createRenderStr(ast) {
  var str = "";

  if (ast.type == 1) {
    str = createRenderStrElemnet(ast);
  } else if (ast.type == 3) {
    str = createRenderStrText(ast);
  } else {
    warn('wrong type:' + ast.type);
  }

  return str;
}

/**
 * 根据元素AST生成渲染函数。
 *
 * 如果是插槽，生成 _t(插槽名字, [默认插槽内容])
 * 否则生成 h(tag, 属性。。。)
 *
 * @param {*} node
 */
function createRenderStrElemnet(node) {
  log('createRenderStrElemnet', node);

  var str = void 0;

  // 插槽使用 _t 函数, 参数为插槽名字
  if (node.tag == 'slot') {
    log('slot node', node);
    var slot = node.attrsMap.name || "default";
    str = '_t("' + slot + '",[';

    if (node.children && node.children.length > 0) {
      // 生成插槽默认的子组件的渲染函数
      for (var i = 0; i < node.children.length; i++) {
        str += createRenderStr(node.children[i]);

        if (i != node.children.length - 1) {
          str += ',';
        }
      }
    }

    str += '])';
    return str;
  }

  // snabbdom 的语法，类名放在tag上。'div#container.two.classes'
  var tagWithIdClass = getTagAndClassName(node);
  str = 'h(' + tagWithIdClass + ',{';

  // 解析指令
  str += getDirectiveStr(node);

  // 解析属性
  str += genAttrStr(node);

  str += "}";

  if (node.children) {
    str += ',[';

    // 保存上一次if指令，处理只有if没有else的场景
    var lastDir = void 0;

    node.children.forEach(function (child) {
      // 如果这里节点有if指令
      var dir = getIfElseDirective(child);

      console.log('dir:', dir);

      if (dir) {
        if (dir.name == 'if') {
          str += '(' + dir.exp + ')?';
          lastDir = dir;
        } else if (dir.name == 'else') {
          str += ':';
        }
      }

      str += createRenderStr(child);

      if (dir) {
        if (dir.name == 'else') {
          str += ',';
          lastDir = null;
        }
      } else if (lastDir) {
        str += ':"",';
        lastDir = null;
      } else {
        str += ',';
      }
    });

    if (lastDir) {
      str += ':"",';
    }

    str += ']';
  }

  str += ')';

  return str;
}

/**
 * 得到该节点的if/else指令
 * @param {*} node
 */
function getIfElseDirective(node) {
  var attrs = node.attrsMap;

  if (!attrs) {
    return;
  }

  var dir = void 0;

  // why not use for..in, see eslint `no-restricted-syntax`
  Object.keys(attrs).some(function (attrname) {
    // 如果是数据绑定，则后面的是表达式
    if (attrname == 'x-if') {
      dir = {
        name: 'if',
        exp: attrs[attrname].trim()
      };
      return true;
    } else if (attrname == 'x-else') {
      dir = {
        name: 'else'
      };
      return true;
    }

    return false;
  });

  return dir;
}

/**
 * 得到带类名的TAG名
 *
 * 返回如 “div.classes” （静态） 或者 “div." + nowClass (动态)
 *
 * TODO : 没有支持id和多class 如 'div#container.two.classes'
 *
 */
function getTagAndClassName(node) {
  var tag = JSON.stringify(node.tag);
  var attrs = node.attrsMap;

  if (!attrs) {
    return tag;
  }

  //FIXME 大小写会有bug

  // 如果有class属性
  var v = attrs['class'];
  if (v) {
    return JSON.stringify(node.tag + '.' + v);
  }

  // 如果有动态绑定的class属性
  v = attrs[':class'];

  if (v) {
    return JSON.stringify(node.tag + '.') + '+' + v;
  }

  return tag;
}

/**
 * 解析属性
 * @param {*} node
 */
function genAttrStr(node) {
  var attrs = node.attrsMap;

  if (!attrs) {
    return "";
  }

  var propsStr = '';
  var styleStr = '';
  var onStr = '';

  // why not use for..in, see eslint `no-restricted-syntax`
  Object.keys(attrs).forEach(function (attrname) {
    var str = '';
    var isEvent = false;
    var val = attrs[attrname].trim();

    // 如果是数据绑定，则后面的是表达式
    if (attrname.charAt(0) == ':') {
      str = JSON.stringify(attrname.substr(1)) + ':' + createExpressStr(val) + ',';
      attrname = attrname.substr(1).toLocaleLowerCase();
    } else if (attrname.charAt(0) == '@') {
      str = JSON.stringify(attrname.substr(1)) + ':' + getFunctionStr(val) + ',';
      isEvent = true;
      attrname = attrname.substr(1).toLocaleLowerCase();
    } else {
      str = JSON.stringify(attrname) + ':' + JSON.stringify(val) + ',';
    }

    // class已经处理了。
    if (attrname !== 'class') {
      if (isEvent) {
        onStr += str;
      } else if (isStyle(attrname)) {
        styleStr += str;
      } else {
        propsStr += str;
      }
    }
  });

  var str = '';

  if (propsStr != '') {
    str += 'props:{' + propsStr + '},';
  }

  if (styleStr != '') {
    str += 'style:{' + styleStr + '},';
  }

  if (onStr != '') {
    str += 'on:{' + onStr + '},';
  }

  return str;
}

function isStyle(name) {
  return name === 'style';
}

/**
 * FIXME 判断字符串是不是只有方法名
 * @param {*} name
 */
function isFuncNameStr(name) {
  return (/^[-A-Za-z0-9_]+$/.test(name)
  );
}

function getFunctionStr(funcStr) {
  // 如果只是函数名，加一个（）调用
  if (isFuncNameStr(funcStr)) {
    funcStr += '(event)';
  }

  return 'function($event){' + funcStr + '} ';
}

/**
 * 解析指令
 * @param {*} node
 */
function getDirectiveStr(node) {
  var dirs = node.directives;

  var str = '';

  if (dirs && dirs.length > 0) {
    str += 'directives:[';

    // why not use for..in, see eslint `no-restricted-syntax`
    for (var i = 0; i < dirs.length; i++) {
      var dir = dirs[i];

      // 把x-model转换为
      // <input :value="name" @input="if($event.target.composing)return;name=$event.target.value.trim()"/>
      if (dir.name == 'x-model') {
        parseModel(node, dir);
        continue;
      } else if (alreadyDeal(dir.name)) {
        continue;
      }

      str += '{';
      for (var key in dir) {
        str += JSON.stringify(key) + ':';

        var val = dir[key];

        // 把value的值修改为表达式，render的时候就可以计算
        if (key == 'value') {
          // 如果有value（表达式）
          if (val) {
            str += '(' + val + '),';
          }
          // 没有表达式，直接赋值一个true即可。
          else {
              str += 'true,';
            }
        } else {
          str += JSON.stringify(val) + ',';
        }
      }
      str += '},';
    }

    str += '],';
  }

  return str;
}

function alreadyDeal(dirname) {
  return dirname == 'x-if' || dirname == 'x-else';
}

// FIXME 这里只处理了Input，还有其他的类型
// 把x-model转换为
// <input :value="name" @input="if($event.target.composing)return;name=$event.target.value.trim()"/>
function parseModel(node, dir) {
  var attrs = node.attrsMap || (node.attrsMap = Object.create(null));
  attrs[':value'] = dir.value;
  attrs['@input'] = 'if($event.target.composing)return;' + dir.value + '=$event.target.value.trim()';
}

function createRenderStrText(node) {

  if (node.isComment) {
    //return JSON.stringify(node.text)
    return '""';
  } else {
    return node.text;
  }
}

function compileToFunction(templte) {
  var ast = html2ast(templte);
  var renderFunctionStr = renderToFunction(ast2render(ast));

  return {
    render: renderFunctionStr
  };
}

function renderToFunction(renderStr) {
  return new Function('with(this){return ' + renderStr + '}');
}

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

/**
 * 简单的i18n国际化插件
 * @param {*} Xiao
 */
function i18n (Xiao$$1) {

  // 扩展一个实例方法
  Xiao$$1.prototype.$t = function (key) {
    var instance = this.$options.i18n;

    console.log('i18n', instance);

    if (instance) {
      var keys = key.split('.');

      var msg = instance.messages[instance.locale];

      for (var i = 0; i < keys.length; i++) {
        msg = msg[keys[i]];
      }

      return msg;
    } else {
      return key;
    }
  };

  console.log('i18n组件注册完毕');
}

// D:\OutPut\VUE\vue\src\core\instance\index.js

//
var uid = 100;

// fixme
var inBrowser = true;

// 全局指令
var globaleDedirectives = Object.create(null);

// 全局插件
var globalPlugins = [];

// 全局组件
var globalComponent = Object.create(null);

// 全局Filter
var globalFilter = Object.create(null);

var Xiao = function () {

  // 计算属性相关的watcher
  // FIXME 还不知道有啥用【应该了为了保证计算属性缓存起来用的】
  // _watcherCompued: Object

  // 事件


  // 渲染次数，自己跟踪用


  // 数据修改之后的监听器


  // 数据
  function Xiao(options) {
    classCallCheck(this, Xiao);
    this._renderCount = 0;

    if ("development" !== 'production' && !(this instanceof Xiao)) {
      warn('Xiao is a constructor and should be called with the `new` keyword');
    }

    // 复制属性
    this.$options = extend(Object.create(null), options);

    this._uid = uid++;

    log('创建组件', this);

    this._init(this.$options);
  }

  // 插槽，数据结构为：数组的对象


  // 子组件的时候，设置当前的父组件


  // 渲染虚拟dom需要用到的。（VUE里面应该是$createElement）


  createClass(Xiao, [{
    key: '$mount',
    value: function $mount(el, hydrating) {
      // get dom element
      var element = query(el);
      this.$el = element;

      log('$mount', this);

      // generate render function
      if (!this.$options.render) {
        // get template string
        if (!this.$options.template) {
          this.$options.template = getOuterHTML(element);
        }

        if (!this.$options.template && !element) {
          warn('options.el && options.template all null');
          return;
        }

        // compiler template to render function

        var _compileToFunction = compileToFunction(this.$options.template),
            render = _compileToFunction.render;

        log('render', render);

        // save to this.$render
        this.$render = render;
      } else {
        // 如果设置了render函数，判断是否是函数
        if (!isFunction(this.$options.render)) {
          error('this.$options.render must be function');
          return;
        }

        this.$render = this.$options.render;
      }

      mountComponent(this, hydrating);
    }
  }, {
    key: '_init',
    value: function _init(options) {
      initState(this);

      initInstanceDedirectives(this);

      var el = options.el;

      if (el && inBrowser) {
        this.$mount(el);
      }
    }

    /**
     * 强制刷新
     */

  }, {
    key: '$forceUpdate',
    value: function $forceUpdate() {
      this._renderWatcher.update();
    }

    /**
     * 观察某个属性
     *
     * 把属性的get方法拿出来，调用get的时候和会对应的新建的watch关联起来（注册了依赖关系）
     * 属性修改的时候，就会调用所有的watch，然后就会调用回调。
     * （这里的回调其实就是用户写的观察函数）
     *
     * @param {*} key
     * @param {*} cb
     */

  }, {
    key: '$watchField',
    value: function $watchField(key, cb) {
      var getter = Object.getOwnPropertyDescriptor(this, key).get;
      this.$watch(getter, cb);
    }

    /**
     * 观察某个方法，调用这个方法之后，会执行callback
     *
     * @param {*} getter
     * @param {*} cb
     */

  }, {
    key: '$watch',
    value: function $watch(getter, cb) {
      new Watcher(this, {
        getter: getter,
        cb: cb
      });

      // fixme
      //return function unwatchFn() {
      //  watcher.teardown()
      //}
    }

    /**
     * 拿到filter的调用方法
     *
     * @param {*} filtername
     */

  }, {
    key: '_f',
    value: function _f(filtername) {
      return Xiao.filter(filtername);
    }

    /**
     * 插槽渲染函数
     *
     * vue里面是 _t = renderSlot
     * @param {*} slot
     */

  }, {
    key: '_t',
    value: function _t(slot, child) {
      // 如果父节点没有制定插槽内容，那么返回默认值(是个数组)
      return this.$slots[slot] || child;
    }

    /**
     * 调用事件
     *
     * @param {*} event
     */

  }, {
    key: '$emit',
    value: function $emit(event) {
      // 无需绑定this，方法生成的时候已经绑定了
      this._events[event]();
    }

    /**
     * 注册全局指令
     * @param {*} name
     * @param {*} cb
     */

  }, {
    key: '$directive',
    value: function $directive(name, cb) {
      this.directives['x-' + name] = cb;
    }

    /**
     * 插件安装指令
     */
    // D:\OutPut\VUE\vue\src\core\global-api\use.js

  }], [{
    key: 'directive',
    value: function directive(name, cb) {
      globaleDedirectives['x-' + name] = cb;
    }
  }, {
    key: 'use',
    value: function use(plugin) {
      if (globalPlugins.indexOf(plugin) > -1) {
        return;
      }

      //fixme additional parameters
      var args = toArray(arguments, 1);
      args.unshift(Xiao); //放到第一个位置

      //apply 见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

      if (typeof plugin.install === 'function') {
        plugin.install.apply(Xiao, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(Xiao, args);
      }

      globalPlugins.push(plugin);
    }

    /**
     * 全局注册组件
     */

  }, {
    key: 'component',
    value: function component(id, definition) {
      if (globalComponent[id]) {
        return globalComponent[id];
      }

      if (!definition) {
        return null;
      }

      var newClass = function (_Xiao) {
        inherits(newClass, _Xiao);

        function newClass() {
          classCallCheck(this, newClass);
          return possibleConstructorReturn(this, (newClass.__proto__ || Object.getPrototypeOf(newClass)).call(this, definition));
        }

        return newClass;
      }(Xiao);

      globalComponent[id] = newClass;
      log('globalComponent', globalComponent);

      return newClass;
    }

    /**
     * 全局注册filter
     *
     * @param {*} filtername
     * @param {*} fn
     */

  }, {
    key: 'filter',
    value: function filter(filtername, fn) {
      log('注册filter', filtername);

      if (globalFilter[filtername]) {
        return globalFilter[filtername];
      }

      globalFilter[filtername] = fn;

      return fn;
    }
  }]);
  return Xiao;
}(); //Xiao

function initInstanceDedirectives(vm) {
  vm.directives = Object.create(null);

  for (var dirname in globaleDedirectives) {
    vm.directives[dirname] = globaleDedirectives[dirname];
  }
}

/**
 * 初始化全局指令
 */
function initGlobaleDedirectives() {
  // 演示一个简单的把背景色变成红色的指令
  Xiao.directive('red', function (el, binding) {
    var originalDisplay = el.__vOriginalBGColor = el.style.backgroundColor === 'red' ? '' : el.style.backgroundColor;

    el.style.backgroundColor = binding.value ? originalDisplay : 'red';
  });

  // 演示和隐藏指令
  Xiao.directive('show', function (el, binding) {
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    el.style.display = binding.value ? originalDisplay : 'none';
  });
}

// 注册默认指令
initGlobaleDedirectives();

// 注册默认插件
Xiao.use(i18n);

return Xiao;

})));
