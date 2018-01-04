//@flow
//d:\OutPut\VUE\vue\src\core\instance\init.js
import {query} from './util/web'
import {mountComponent} from './lifecycle'

let uid = 0;

//fixme
let inBrowser = true;

export function initMount(Xiao: function){

    //D:\OutPut\VUE\vue\src\platforms\web\runtime\index.js
    Xiao.prototype.$mount = function (
        el?: string,// | Element
        hydrating?: boolean
    ) {
        el = el && inBrowser ? query(el) : '' //fixme undefined
        return mountComponent(this, el, hydrating)
    }

    Xiao.poprotype._init = function (options?: Object) {

        const vm = this
        // a uid
        vm._uid = uid++

        //
        vm.$options = options || {};

        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    }
}