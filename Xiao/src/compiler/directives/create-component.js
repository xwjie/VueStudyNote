
import { log, warn } from '../../util'
import Xiao from '../../main'

function updateDirective(vnode) {
  let sel = vnode.data.sel

  log('create-component', sel)

  if('todo-item' == sel){
    log('是组件')
  }

  let Comp = Xiao.component(sel)

  log('组件', Comp)

  let comp = vnode.componentInstance = new Comp();

  comp.$mount(vnode.elm)
}

export default {
  init: updateDirective
  //update: updateDirective
};
