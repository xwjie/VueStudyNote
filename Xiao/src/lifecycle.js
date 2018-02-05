/* @flow */
import Xiao from './main'
import { warn, log } from './util/debug'
import { h, patch } from './compiler/snabbdom'
import { observe, defineReactive } from './observer'
import { initProps, updateProps, initEvent, initWatch } from './states'

import Watcher from './observer/watcher'

// D:\OutPut\VUE\vue\src\core\instance\lifecycle.js
export function mountComponent(
  vm: Xiao,
  hydrating?: boolean
) {
  // 产生一个代理对象（VUE开发环境会使用Proxy产生一个代理对象，发布环境就是vue对象自己）
  // 调用生成的render函数绑定的this就是它。（whth(this)）
  vm._renderWatcher = new Watcher(vm, { getter: updateComponent });
}

/**
 * 渲染组件
 *
 * @param {*} vm
 */
function updateComponent(vm: Xiao) {
  let proxy = vm

  // 虚拟dom里面的创建函数
  proxy.h = h

  // 新的虚拟节点
  // 指令的信息已经自动附带再vnode里面
  let vnode = vm.$render.call(proxy, h)

  log('before expandSlotArray: ', vnode)

  // 插槽渲染函数_t执行后，child里面应该为节点的可能变成了数组，所以要打算处理一下
  expandSlotArray(vnode)

  log('after expandSlotArray: ', vnode)

  // 把实例绑定到vnode中，处理指令需要用到
  setContext(vnode, vm)

  // 处理子组件
  setComponentHook(vnode, vm)

  // 上一次渲染的虚拟dom
  let preNode = vm.$options.oldvnode;

  log(`[lifecycle][uid:${vm._uid}] 第${++vm._renderCount}次渲染`)

  if (preNode) {
    vnode = patch(preNode, vnode)
  }
  else {
    vnode = patch(vm.$el, vnode)
  }

  log('vnode', vnode)

  // 保存起来，下次patch需要用到
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

/**
 * 实现组件功能
 *
 * 采用snabbdom的hook，在insert和update的时候更新数据。
 *
 * @param {*} vnode
 * @param {*} vm
 */
function setComponentHook(vnode: any, vm: Xiao) {
  if (!vnode.sel) {
    return
  }

  // 查看是否组成了组件？
  const Comp = Xiao.component(vnode.sel)

  if (Comp) {
    vnode.data.hook = {
      insert: (vnode) => {
        log('component vnode', vnode)

        // 创建子组件实例
        let app = new Comp(vm)

        const propsData = vnode.data.props

        // 把计算后的props数据代理到当前vue里面
        initProps(app, propsData)

        // 处理了子组件的props之后处理watch
        initWatch(app)

        // 处理插槽，把插槽归类
        resolveSlots(app, vnode.children)

        // 绑定事件
        if (vnode.data.on) {
          initEvent(app, vnode.data.on)
        }

        // 保存到vnode中，更新的时候需要取出来用
        vnode.childContext = app

        // 渲染
        app.$mount(vnode.elm)
      },
      update: (oldvnode, vnode) => {
        const app = oldvnode.childContext

        // 更新update属性
        updateProps(app, vnode.data.props)

        vnode.childContext = app
      }

    }
  }//组件

  // 递归
  if (vnode.children) {
    vnode.children.forEach(function (e) {
      setComponentHook(e, vm)
    }, this)
  }

}

/**
 * 归类插槽
 *
 * @param {*} vm
 * @param {*} children
 */
function resolveSlots(vm: Xiao, children: Array<any>) {
  log('resolveSlots[插槽分类]', children)

  vm.$slots = {}

  children.forEach(vnode => {
    let slotname = 'default'

    // 文本的时候没有data
    if (vnode.data && vnode.data.props && vnode.data.props.slot) {
      slotname = vnode.data.props.slot
      delete vnode.data.props.slot
    }

    (vm.$slots[slotname] || (vm.$slots[slotname] = [])).push(vnode)
  })

  log('resolveSlots[插槽分类] end', vm.$slots)
}


function expandSlotArray(vnode: any) {
  const children = vnode.children

  if (!children) return

  for (let i = 0; i < children.length; i++) {
    // 把对应位置的数组打散
    if (Array.isArray(children[i])) {
      children.splice(i, 1, ...children[i])
    }

    // 单独处理纯文本，包装为对象，否则会出错
    if (typeof children[i] == 'string') {
      children[i] = {
        text: children[i]
      }
    }
  }
}
