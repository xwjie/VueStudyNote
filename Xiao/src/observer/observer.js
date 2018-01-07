/* @flow */

import Dep from './dep'
import { log, warn } from '../util'

export function observe(data: any, asRootData: ?boolean) {
  return new Observer(data);
}

// D:\OutPut\VUE\vue\src\core\observer\index.js
class Observer {

  value: any;
  dep: Dep;

  constructor(value: any) {
    log('[observer] __INIT__ , vlaue:', value);

    this.value = value;
    this.dep = new Dep();

    this.walk(value);
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

/**
 * Define a reactive property on an Object.
 */
export function defineReactive(
  obj: Object,
  key: string,
  val: any,
  shallow?: boolean
) {
  const property = Object.getOwnPropertyDescriptor(obj, key)

  if (property && property.configurable === false) {
    return
  }

  const dep = new Dep()
  log('[observer]定义观察者，属性：' + key)

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set

  //fixme ??
  //let childOb = !shallow && observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      log('[observer]get方法被调用，属性：' + key)
      const value = getter ? getter.call(obj) : val

      //if (Dep.target) {
      //  dep.depend()
      //if (childOb) {
      //  childOb.dep.depend()
      //}
      //}

      return value
    },

    set: function reactiveSetter(newVal) {
      log('[observer]set方法被调用，属性：' + key)
      const value = getter ? getter.call(obj) : val

      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }

      //childOb = !shallow && observe(newVal)

      dep.notify()
    }
  })
}

export { Observer }
