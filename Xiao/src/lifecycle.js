/* @flow */
import Xiao from './main'
import { warn, log } from './util/debug'
import { h, patch } from './compiler/snabbdom'

import Watcher from './observer/watcher'

// D:\OutPut\VUE\vue\src\core\instance\lifecycle.js
export function mountComponent(
  vm: Xiao,
  hydrating?: boolean
) {
  // 产生一个代理对象（VUE开发环境会使用Proxy产生一个代理对象，发布环境就是vue对象自己）
  // 调用生成的render函数绑定的this就是它。（whth(this)）
  vm._renderWatcher = new Watcher(vm, updateComponent);
}

let renderCount: number = 1;

function updateComponent(vm: Xiao) {
  let proxy = vm

  // 虚拟dom里面的创建函数
  proxy.h = h

  // 新的虚拟节点
  let vnode = vm.$render.call(proxy)

  // 上一次渲染的虚拟dom
  let preNode = vm.$options.oldvnode;

  log(`[lifecycle] 第${renderCount}次渲染`)

  if (preNode) {
    vnode = patch(preNode, vnode)
  }
  else {
    vnode = patch(vm.$el, vnode)
  }

  renderCount++;

  // save
  vm.$options.oldvnode = vnode;
}
