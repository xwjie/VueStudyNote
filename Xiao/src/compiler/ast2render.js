/* @flow */
import { log, warn } from '../util'

// D:\OutPut\VUE\vue\src\compiler\codegen\index.js
function ast2render(ast: ?ASTElement): string {
  let renderStr: string = ''

  /*
  产生类似这样的snabbdom函数字符串
  h('div#container.two.classes', { on: { click: someFn } }, [
      h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
      h('h1', strVar),
      'this is string',
      h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
  ])
  */

  if (ast) {
    renderStr = createRenderStr(ast)
  }

  log(`[ast2render]虚拟dom函数字符串:${renderStr}`)

  return renderStr
}

function createRenderStrElemnet(node: any): string {
  log('createRenderStrElemnet', node)

  let str: string = 'h(' + JSON.stringify(node.tag)

  let attrs = node.attrsMap

  if (attrs) {
    str += ',{'

    // why not use for..in, see eslint `no-restricted-syntax`
    Object.keys(attrs).every(attrname => {
      // str += JSON.stringify(attrname) + '=' + JSON.stringify(attrs[attrname]) + ' '
    })

    str += '}'
  }

  if (node.children) {
    str += ',['

    node.children.forEach(child => {
      str += createRenderStr(child) + ','
    })

    str += ']'
  }

  str += ')'

  return str
}

function createRenderStrText(node: any): string {
  return node.text
}


function createRenderStr(ast: ASTNode): string {
  let str: string = ""

  if (ast.type == 1) {
    str = createRenderStrElemnet(ast)
  } else if (ast.type == 3) {
    str = createRenderStrText(ast)
  } else {
    warn(`wrong type:${ast.type}`)
  }

  return str

}

export { ast2render }
