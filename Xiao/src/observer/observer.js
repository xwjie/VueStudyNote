/* @flow */

import Dep from './dep'
import { log, warn, isObject, hasOwn, isPlainObject } from '../util'

// D:\OutPut\VUE\vue\src\core\observer\index.js
class Observer {

  value: any
  dep: Dep

  constructor(value: any) {
    log('[observer] __INIT__ , vlaue:', value)

    this.value = value
    this.dep = new Dep()

    this.walk(value)
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
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value)) { // fixme  || value instanceof VNode
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    // observerState.shouldConvert &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value)
  ) {
    ob = new Observer(value)
  }

  // fixme
  // if (asRootData && ob) {
  // ob.vmCount++
  // }

  return ob
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

  // xwjie 这里应该可以考虑优化，如果和模板没有关系，dep不需要创建
  const dep = new Dep()

  log(`[observer]定义观察者，属性：${key}`)

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set

  // 监听子属性
  let childOb = observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // log('[observer]get方法被调用，属性：' + key)
      const value = getter ? getter.call(obj) : val

      if (Dep.target) {
        dep.depend()

        // 子属性的依赖关系也要登记起来
        if (childOb) {
          childOb.dep.depend()
        }
      }

      return value
    },

    set: function reactiveSetter(newVal) {
      // log('[observer]set方法被调用，属性：' + key)
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

      // 监听新设置进来的数据
      childOb = observe(newVal) //!shallow &&

      dep.notify()
    }
  })
}

export { Observer }
