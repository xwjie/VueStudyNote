"use strict";

function updateDirective(oldVnode, vnode) {
  let nodeDirs = vnode.data.directives;

  // 没有指令
  if (!nodeDirs || nodeDirs.length == 0) {
    return;
  }

  console.log('自定义指令处理：', nodeDirs);

  const vm = vnode.context
  const dirs = vm.directives

  nodeDirs.forEach(function (dir) {
    // 调用指令的处理函数。
    // fixme 应该判断一下，旧的指令的value和新的指令的value是否相同，不相同才调用
    dirs[dir.name].call(window, vnode.elm, dir, vnode, oldVnode)
    //dirs[dir.name].call(vm, vnode.elm, dir, vnode, oldVnode)
  }, vm);
}

export default {
  create: updateDirective,
  update: updateDirective
};
