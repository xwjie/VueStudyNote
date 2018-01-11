"use strict";

function updateDirective(oldVnode, vnode) {
  var elm = vnode.elm, nodeDirs = vnode.data.directives;

  if (!nodeDirs)
    return;

  nodeDirs = nodeDirs || {};

  console.log('自定义指令处理：', vnode.context);
  console.log('自定义指令处理：', vnode);
  console.log('自定义指令处理：', nodeDirs);

  const vm = vnode.context
  const dirs = vm.directives

  nodeDirs.forEach(function (dir) {
    // 调用指令的处理函数。
    dirs[dir.name](elm, dir)
  }, vm);
}

export default {
  create: updateDirective,
  update: updateDirective
};
