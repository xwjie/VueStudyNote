import { log } from '../util'

const argRE = /:(.*)$/;
const modifierRE = /\.[^.]+/g;

export function processAttrs(el, attrs) {

  let i, l, name, rawName, value, modifiers, isProp
  for (i = 0, l = attrs.length; i < l; i++) {
    name = rawName = attrs[i].name
    value = attrs[i].value


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

function isDirective(name: String): boolean {
  return name.startsWith('x-')
}

function parseModifiers(name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

/**
 *
 * @param {*} el
 * @param {*} name
 * @param {*} rawName
 * @param {*} value
 * @param {*} arg
 * @param {*} modifiers
 */
function addDirective(
  el: ASTElement,
  name: string,
  rawName: string,
  value: string,
  arg: ?string,
  modifiers: ?ASTModifiers
) {
  (el.directives || (el.directives = [])).push({ name, rawName, value, arg, modifiers })
  el.plain = false
}
