// @flow
// D:\OutPut\VUE\vue\src\core\instance\index.js

import { warn, error, log, isFunction, toArray } from './util'
import { extend } from './shared/util'
import { mountComponent } from './lifecycle'
import { compileToFunction } from './compiler'
import { query, getOuterHTML } from './util/web'
import { initState } from './states'
import Watcher from './observer/watcher'
import i18n from './plugins/i18n'

//
let uid = 100

// fixme
const inBrowser = true

// 全局指令
const globaleDedirectives: Object = Object.create(null)

// 全局插件
const globalPlugins: Array<Function | Object> = []


// 全局组件
const globalComponent: Object = Object.create(null)

class Xiao {
  _uid: number

  $el: ?Element

  $options: Object

  $render: Function

  directives: Object

  // 渲染虚拟dom需要用到的。（VUE里面应该是$createElement）
  h: Function

  // 数据
  _data: Object
  _props: Object

  // 数据修改之后的监听器
  _renderWatcher: Watcher
  _watchers: Array<any>

  // 渲染次数，自己跟踪用
  _renderCount: number = 0

  // 子组件的时候，设置当前的父组件
  $parent: ?Xiao

  // 计算属性相关的watcher
  // FIXME 还不知道有啥用【应该了为了保证计算属性缓存起来用的】
  // _watcherCompued: Object

  constructor(options?: Object) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Xiao)
    ) {
      warn('Xiao is a constructor and should be called with the `new` keyword')
    }

    // 复制属性
    this.$options = extend(Object.create(null), options)

    this._uid = uid++

    log('创建组件', this)

    this._init(this.$options)
  }

  $mount(el: Element | string, hydrating?: boolean) {
    // get dom element
    let element = query(el)

    // get template string
    if (!this.$options.template) {
      this.$options.template = getOuterHTML(element)
    }

    if (!this.$options.template && !element) {
      warn('options.el && options.template all null')
      return
    }

    this.$el = element
    log('$mount', this)

    // generate render function
    if (!this.$options.render) {
      // compiler template to render function
      const { render } = compileToFunction(this.$options.template)

      log('render', render)

      // save to this.$render
      this.$render = render
    } else if (!isFunction(this.$options.render)) {
      error('this.$options.render must be function')
      return
    }

    mountComponent(this, hydrating)
  }

  _init(options: Object) {
    initState(this)

    initInstanceDedirectives(this)

    let el: string | Element = options.el

    if (el && inBrowser) {
      this.$mount(el)
    }


  }

  /**
   * 强制刷新
   */
  $forceUpdate() {
    this._renderWatcher.update()
  }



  /**
   * 注册全局指令
   * @param {*} name
   * @param {*} cb
   */
  static directive(name: string, cb: any) {
    globaleDedirectives[`x-${name}`] = cb
  }

  $directive(name: string, cb: any) {
    this.directives[`x-${name}`] = cb
  }

  /**
   * 插件安装指令
   */
  // D:\OutPut\VUE\vue\src\core\global-api\use.js
  static use(plugin: Function | Object) {
    if (globalPlugins.indexOf(plugin) > -1) {
      return
    }

    //fixme additional parameters
    const args = toArray(arguments, 1)
    args.unshift(Xiao) //放到第一个位置

    //apply 见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

    if (typeof plugin.install === 'function') {
      plugin.install.apply(Xiao, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(Xiao, args)
    }

    globalPlugins.push(plugin)
  }

  /**
   * 全局注册组件
   */
  static component(id: string, definition?: Object) {
    if (globalComponent[id]) {
      return globalComponent[id]
    }

    if (!definition) {
      return null
    }

    const newClass = class extends Xiao {
      constructor() {
        super(definition)
      }
    }

    globalComponent[id] = newClass
    log('globalComponent', globalComponent)

    return newClass
  }

}//Xiao

function initInstanceDedirectives(vm: Xiao) {
  vm.directives = Object.create(null)

  for (let dirname in globaleDedirectives) {
    vm.directives[dirname] = globaleDedirectives[dirname]
  }
}


/**
 * 初始化全局指令
 */
function initGlobaleDedirectives() {
  // 演示一个简单的把背景色变成红色的指令
  Xiao.directive('red', function (el, binding) {
    const originalDisplay = el.__vOriginalBGColor =
      el.style.backgroundColor === 'red' ? '' : el.style.backgroundColor

    el.style.backgroundColor = binding.value ? originalDisplay : 'red'
  })

  // 演示和隐藏指令
  Xiao.directive('show', function (el, binding) {
    const originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display

    el.style.display = binding.value ? originalDisplay : 'none'
  })
}


// 注册默认指令
initGlobaleDedirectives()

// 注册默认插件
Xiao.use(i18n)

export default Xiao
