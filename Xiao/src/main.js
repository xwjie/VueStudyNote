// @flow
// D:\OutPut\VUE\vue\src\core\instance\index.js

import { warn, error, log, isFunction } from './util'
import { mountComponent } from './lifecycle'
import { compileToFunction } from './compiler'
import { query, getOuterHTML } from './util/web'
import { initState } from './states'
import Watcher from './observer/watcher'

//
let uid = 100

// fixme
const inBrowser = true

class Xiao {
  _uid: number

  $el: ?Element

  $options: Object

  $render: Function

  // 渲染虚拟dom需要用到的。（VUE里面应该是$createElement）
  h: Function

  // 数据
  _data: Object

  // 数据修改之后的监听器
  _renderWatcher: Watcher
  _watchers: Array<any>

  constructor(options: Object) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Xiao)
    ) {
      warn('Xiao is a constructor and should be called with the `new` keyword')
    }

    this.$options = options
    this._uid = uid++

    log('main start', this)

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

    let el: string | Element = options.el

    if (el && inBrowser) {
      this.$mount(el)
    }
  }
}

export default Xiao
