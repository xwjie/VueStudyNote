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
var error = noop;

{
  error = warn = function warn(msg) {
    console.error('[Xiao warn]: ' + msg);
  };

  log = console.log;
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


/**
 * Parse simple path.
 */

function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}

//# sourceMappingURL=vnode.js.map

var array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
//# sourceMappingURL=is.js.map

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

//# sourceMappingURL=htmldomapi.js.map

//# sourceMappingURL=h.js.map

//# sourceMappingURL=thunk.js.map

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
//# sourceMappingURL=snabbdom.js.map

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
//# sourceMappingURL=class.js.map
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
//# sourceMappingURL=props.js.map
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
//# sourceMappingURL=style.js.map
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
//# sourceMappingURL=eventlisteners.js.map
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
//# sourceMappingURL=vnode.js.map
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
//# sourceMappingURL=is.js.map
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
//# sourceMappingURL=h.js.map
});

var h$3 = unwrapExports(h_1);
var h_2 = h_1.h;

var patch = init([// Init patch function with chosen modules
_class$1, // makes it easy to toggle classes
props$1, // for setting properties on DOM elements
style$1, // handles styling on elements with support for animations
eventlisteners$1, // attaches event listeners
directive] // xiaowenjie add 处理指令
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

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.

Dep.target = null;
// const targetStack = []

function pushTarget(_target) {
  // if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target;
}

function popTarget() {
  // Dep.target = targetStack.pop()
  Dep.target = null;
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
// }

var Watcher = function () {
  function Watcher(vm, renderFunction) {
    classCallCheck(this, Watcher);

    this.vm = vm;
    this.getter = renderFunction;
    this.depIds = new _Set();

    log('[Watcher] _INIT_');

    this.get();
  }

  createClass(Watcher, [{
    key: 'get',
    value: function get$$1() {
      try {
        pushTarget(this);
        this.getter.call(this.vm, this.vm);
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
      log('[Watcher] update');

      // fixme
      this.get();
    }
  }]);
  return Watcher;
}();

function mountComponent(vm, hydrating) {
  // 产生一个代理对象（VUE开发环境会使用Proxy产生一个代理对象，发布环境就是vue对象自己）
  // 调用生成的render函数绑定的this就是它。（whth(this)）
  vm._renderWatcher = new Watcher(vm, updateComponent);
}

var renderCount = 1;

function updateComponent(vm) {
  var proxy = vm;

  // 虚拟dom里面的创建函数
  proxy.h = h;

  // 新的虚拟节点
  // 指令的信息已经自动附带再vnode里面
  var vnode = vm.$render.call(proxy);

  // 把实例绑定到vnode中，处理指令需要用到
  setContext(vnode, vm);

  // 上一次渲染的虚拟dom
  var preNode = vm.$options.oldvnode;

  log('[lifecycle] \u7B2C' + renderCount + '\u6B21\u6E32\u67D3');

  if (preNode) {
    vnode = patch(preNode, vnode);
  } else {
    vnode = patch(vm.$el, vnode);
  }

  log('vnode', vnode);

  renderCount++;

  // save
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
    tokens.push(exp);

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

function createRenderStrElemnet(node) {
  log('createRenderStrElemnet', node);

  var str = 'h(' + JSON.stringify(node.tag) + ",{";

  // 解析属性
  str += genAttrStr(node);

  // 解析指令
  str += getDirectiveStr(node);

  str += "}";

  if (node.children) {
    str += ',[';

    node.children.forEach(function (child) {
      str += createRenderStr(child) + ',';
    });

    str += ']';
  }

  str += ')';

  return str;
}

/**
 * 解析属性
 * @param {*} node
 */
function genAttrStr(node) {
  var attrs = node.attrsMap;

  var str = '';

  if (attrs) {
    str += 'attrs:{';

    // why not use for..in, see eslint `no-restricted-syntax`
    Object.keys(attrs).every(function (attrname) {
      // str += JSON.stringify(attrname) + '=' + JSON.stringify(attrs[attrname]) + ' '
    });

    str += '},';
  }

  return str;
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
    dirs.forEach(function (dir) {
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
    });

    str += '],';
  }

  return str;
}

function createRenderStrText(node) {

  if (node.isComment) {
    //return JSON.stringify(node.text)
    return '';
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

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  //if (opts.props) initProps(vm, opts.props)
  //if (opts.methods) initMethods(vm, opts.methods)

  initData(vm);
  initComputed(vm);
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

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

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

var uid = 100;

// fixme
var inBrowser = true;

// 全局指令
var globaleDedirectives = Object.create(null);

// 全局插件
var globalPlugins = [];

var Xiao = function () {

  // 计算属性相关的watcher
  // FIXME 还不知道有啥用【应该了为了保证计算属性缓存起来用的】
  // _watcherCompued: Object

  // 数据修改之后的监听器


  // 渲染虚拟dom需要用到的。（VUE里面应该是$createElement）
  function Xiao(options) {
    classCallCheck(this, Xiao);

    if ("development" !== 'production' && !(this instanceof Xiao)) {
      warn('Xiao is a constructor and should be called with the `new` keyword');
    }

    this.$options = options;
    this._uid = uid++;

    log('main start', this);

    this._init(this.$options);
  }

  // 数据


  createClass(Xiao, [{
    key: '$mount',
    value: function $mount(el, hydrating) {
      // get dom element
      var element = query(el);

      // get template string
      if (!this.$options.template) {
        this.$options.template = getOuterHTML(element);
      }

      if (!this.$options.template && !element) {
        warn('options.el && options.template all null');
        return;
      }

      this.$el = element;
      log('$mount', this);

      // generate render function
      if (!this.$options.render) {
        // compiler template to render function
        var _compileToFunction = compileToFunction(this.$options.template),
            render = _compileToFunction.render;

        log('render', render);

        // save to this.$render
        this.$render = render;
      } else if (!isFunction(this.$options.render)) {
        error('this.$options.render must be function');
        return;
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
    el.style.backgroundColor = 'red'; // binding.value
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
