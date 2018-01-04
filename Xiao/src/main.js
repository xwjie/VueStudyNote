// @flow
// D:\OutPut\VUE\vue\src\core\instance\index.js

import { warn, log } from './util'
import { mountComponent } from './lifecycle'
import { query } from './util/web'

let uid = 0;

//fixme
let inBrowser = true;

class Xiao {
  _uid: number;
  $options: Object;

  constructor(options: Object) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Xiao)
    ) {
      warn('Xiao is a constructor and should be called with the `new` keyword')
    }

    this.$options = options || {};

    log('main start', options);
  }

  $mount(
    el?: string,// | Element
    hydrating?: boolean
  ) {

    el = el && inBrowser ? query(el) : '' //fixme undefined
    return mountComponent(this, el, hydrating)
  }

  _init(options?: Object) {
    const vm = this;


    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }
}

export default Xiao
