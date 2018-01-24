/* @flow */
import { log, warn } from '../util'
import Dep, { pushTarget, popTarget } from './dep'
import Xiao from '../main'
import type { SimpleSet } from '../shared/set'
import { _Set as Set } from '../shared/set'
import {queueWatcher} from './scheduler'

let uid = 0

export default class Watcher {

  vm: Xiao

  getter: Function

  depIds: SimpleSet

  cb: ?Function

  value: ?any

  id: number

  /**
   *
   * @param {*} vm
   * @param {*} option
   *  getter: 函数，为render函数或者属性的get函数
   *  cb ： 回调函数，可以为空
   */
  constructor(vm: Xiao, option: Object) {
    this.vm = vm
    this.id = ++uid

    this.getter = option.getter
    this.cb = option.cb

    this.depIds = new Set()

    log(`[Watcher${this.id}] _INIT_`)

    this.get()
  }

  get() {
    try {
      pushTarget(this)
      const value = this.getter.call(this.vm, this.vm)

      // 监控属性的时候，回调不为空
      if (this.cb) {
        const oldValue = this.value

        if (value !== oldValue) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (error) {

          }
        }
      }

      // 保存最新值
      this.value = value
    }
    finally {
      popTarget()
    }
  }

  /**
  * Add a dependency to this directive.
  */
  addDep(dep: Dep) {
    if (!this.depIds.has(dep.id)) {
      dep.addSub(this)
      this.depIds.add(dep.id)
    }
  }

  update() {
    log(`[Watcher${this.id}] update`)

    // fixme
    // this.get();
    // 放队列里面执行
    queueWatcher(this)
  }
}


