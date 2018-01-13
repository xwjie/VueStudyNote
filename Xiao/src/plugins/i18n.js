

import Xiao from '../main'

/**
 * 简单的i18n国际化插件
 * @param {*} Xiao
 */
export default function (Xiao: Xiao) {

  // 扩展一个实例方法
  Xiao.prototype.$t = function (key) {
    const instance = this.$options.i18n

    console.log('i18n', instance)

    if (instance) {
      const keys = key.split('.')

      let msg = instance.messages[instance.locale]

      for (let i = 0; i < keys.length; i++) {
        msg = msg[keys[i]]
      }

      return msg
    }
    else {
      return key
    }
  }

  console.log('i18n组件注册完毕')
}
