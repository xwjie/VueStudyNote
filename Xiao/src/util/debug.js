//@flow
//copy from D:\OutPut\VUE\vue\src\core\util\debug.js

import { noop } from '../shared/util'

export let warn = noop
export let log = noop
export let logstart = noop
export let logend = noop
export let error = noop

if (process.env.NODE_ENV !== 'production') {
  error = warn = console.error
  log = console.log
  logstart = console.group
  logend = console.groupEnd
}
