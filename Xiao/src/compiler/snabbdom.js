
import * as snabbdom from 'snabbdom'
import * as snabbdom_class from 'snabbdom/modules/class'
import * as snabbdom_props from 'snabbdom/modules/props'
import * as snabbdom_style from 'snabbdom/modules/style'
import * as snabbdom_directive from './directives/directive'
import * as snabbdom_eventlisteners from 'snabbdom/modules/eventlisteners'
import * as snabbdom_h from 'snabbdom/h'

const patch = snabbdom.init([ // Init patch function with chosen modules
  snabbdom_class.default, // makes it easy to toggle classes
  snabbdom_props.default, // for setting properties on DOM elements
  snabbdom_style.default, // handles styling on elements with support for animations
  snabbdom_eventlisteners.default, // attaches event listeners
  snabbdom_directive.default, // xiaowenjie add 处理指令
])

const h = snabbdom_h.default // helper function for creating vnodes

export { h, patch }
