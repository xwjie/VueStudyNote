/* @flow */
import Xiao from './main'
import { isPlainObject, log, warn, hasOwn, isReserved } from './util'
import { noop } from './shared/util'
import { observe } from './observer'

//D:\OutPut\VUE\vue\src\core\instance\state.js

export function initState(vm: Xiao) {
    vm._watchers = []
    const opts = vm.$options

    //if (opts.props) initProps(vm, opts.props)
    //if (opts.methods) initMethods(vm, opts.methods)

    if (opts.data) {
        initData(vm)
    } else {
        //observe(vm._data = {}, true /* asRootData */)
    }
}

function initData(vm: Xiao) {
    let data = vm.$options.data

    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {}

    // proxy data on instance
    const keys = Object.keys(data)
    const props = vm.$options.props
    const methods = vm.$options.methods

    let i = keys.length

    while (i--) {
        const key = keys[i]

        if (!isReserved(key)) {
            proxy(vm, `_data`, key)
        }
    }

    // observe data
    observe(data, true /* asRootData */)
}

export function getData(data: Function, vm: Xiao): any {
    try {
        return data.call(vm, vm)
    } catch (e) {
        warn("get data error:", e);
        return {}
    }
}



const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

export function proxy(target: Object, sourceKey: string, key: string) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }

    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }

    Object.defineProperty(target, key, sharedPropertyDefinition)
}