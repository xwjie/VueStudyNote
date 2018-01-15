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
  // 指令的信息已经自动附带再vnode里面
  let vnode = vm.$render.call(proxy)

  // 把实例绑定到vnode中，处理指令需要用到
  setContext(vnode, vm)

  //
  setComponentHook(vnode, vm)

  // 上一次渲染的虚拟dom
  let preNode = vm.$options.oldvnode;

  log(`[lifecycle] 第${renderCount}次渲染`)

  if (preNode) {
    vnode = patch(preNode, vnode)
  }
  else {
    vnode = patch(vm.$el, vnode)
  }

  log('vnode', vnode)

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
function setContext(vnode: any, vm: Xiao) {
  // 如果当前节点有指令，设置context
  if (!vnode.context) {
    if (vnode.data && vnode.data.directives) {
      vnode.context = vm
    }
  }

  if (vnode.children) {
    vnode.children.forEach(function (e) {
      setContext(e, vm)
    }, this)
  }
}

function setComponentHook(vnode: any, vm: Xiao) {
  if (!vnode.sel) {
    return
  }

  // 查看是否组成了组件？
  const Comp = Xiao.component(vnode.sel)

  if (Comp) {
    log('组件', Comp)

    vnode.data.hook = {
      insert: (vnode) => {
        log('component vnode', vnode)

        let app =new Comp()
        app._parent = vm

        app.$mount(vnode.elm)
      }
    }
  }

  if (vnode.children) {
    vnode.children.forEach(function (e) {
      setComponentHook(e, vm)
    }, this)
  }



}
