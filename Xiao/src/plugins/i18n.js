

import Xiao from '../main'

export default function (Xiao: Xiao) {

  Xiao.prototype.$t = function (key) {
    return '[' + key + ']'
  }

  console.log('i18n组件注册完毕')
}
