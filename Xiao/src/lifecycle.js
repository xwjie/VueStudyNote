/* @flow */
import Xiao from './main'
import { warn, log } from './util/debug'
import { h, patch } from './compiler/snabbdom'

// D:\OutPut\VUE\vue\src\core\instance\lifecycle.js
export function mountComponent(
  vm: Xiao,
  el: Element,
  hydrating?: boolean
) {
  // 产生一个代理对象（VUE开发环境会使用Proxy产生一个代理对象，发布环境就是vue对象自己）
  // 调用生成的render函数绑定的this就是它。（whth(this)）
  let proxy = vm

  proxy.h = h;

  let vnode = vm.$render.call(proxy);

  //
  vm.$render.oldvnode = patch(el, vnode);
}
