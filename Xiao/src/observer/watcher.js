/* @flow */
import { log, warn } from '../util'
import type Dep from './dep'

export default class Watcher {


    constructor() {
        log('[Watcher] _INIT_');
    }

    /**
    * Add a dependency to this directive.
    */
    addDep(dep: Dep) {

    }

    update() {
        log('[Watcher] update');

    }
}