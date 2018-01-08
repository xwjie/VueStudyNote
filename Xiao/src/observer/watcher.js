/* @flow */
import { log, warn } from '../util'
import Dep, { pushTarget, popTarget } from './dep'
import Xiao from '../main'
import type { SimpleSet } from '../shared/set'
import { _Set as Set } from '../shared/set'

export default class Watcher {

  vm: Xiao

  getter: Function

  depIds: SimpleSet;

  constructor(vm: Xiao, renderFunction: Function) {
    this.vm = vm
    this.getter = renderFunction
    this.depIds = new Set()

    log('[Watcher] _INIT_')

    this.get()
  }

  get() {
    try {
      pushTarget(this)
      this.getter.call(this.vm, this.vm)
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
    log('[Watcher] update')

    // fixme
    this.get();
  }
}


