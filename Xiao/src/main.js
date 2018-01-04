// @flow
// D:\OutPut\VUE\vue\src\core\instance\index.js

import { warn, log } from './util'
import { mountComponent } from './lifecycle'
import { query, getOuterHTML } from './util/web'

// 
let uid = 100;

//fixme
let inBrowser = true;

class Xiao {
  //properties
  _uid: number;

  $el: ?Element;

  $options: Object;

  constructor(options: Object) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Xiao)
    ) {
      warn('Xiao is a constructor and should be called with the `new` keyword')
    }

    this.$options = options || {};
    this._uid = uid++;

    log('main start', this);

    this._init(this.$options);
  }

  $mount(el: Element | string, hydrating?: boolean) {
    let element = query(el);

    if (!this.$options.template) {
      this.$options.template = getOuterHTML(element);
    }

    if (!this.$options.template && !element) {
      warn("options.el && options.template all null");
      return;
    }

    this.$el = element;
    log('$mount', this);

    return mountComponent(this, element, hydrating)
  }

  _init(options: Object) {
    let el: string | Element = options.el;

    if (el && inBrowser) {
      this.$mount(el);
    }

  }
}

export default Xiao
