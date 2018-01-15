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
    log('ast', ast)
    renderStr = createRenderStr(ast)
  }

  log(`[ast2render]虚拟dom函数字符串:${renderStr}`)

  return renderStr
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


function createRenderStrElemnet(node: any): string {
  log('createRenderStrElemnet', node)

  let str: string = 'h(' + JSON.stringify(node.tag) + ",{"

  // 解析属性
  str += genAttrStr(node)

  // 解析指令
  str += getDirectiveStr(node)

  str += "}"

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

/**
 * 解析属性
 * @param {*} node
 */
function genAttrStr(node: any) {
  let attrs = node.attrsMap

  let str = '';

  if (attrs) {
    str += 'attrs:{'

    // why not use for..in, see eslint `no-restricted-syntax`
    Object.keys(attrs).every(attrname => {
      if (attrname.charAt(0) == ':') {
        str += JSON.stringify(attrname.substr(1)) + ':' + attrs[attrname] + ','
      }
      else {
        str += JSON.stringify(attrname) + ':' + JSON.stringify(attrs[attrname]) + ','
      }
    })

    str += '},'
  }

  return str;
}


/**
 * 解析指令
 * @param {*} node
 */
function getDirectiveStr(node: any) {
  let dirs = node.directives

  let str = '';

  if (dirs && dirs.length > 0) {
    str += 'directives:['

    // why not use for..in, see eslint `no-restricted-syntax`
    dirs.forEach(dir => {
      str += '{'
      for (let key in dir) {
        str += JSON.stringify(key) + ':'

        const val = dir[key]

        // 把value的值修改为表达式，render的时候就可以计算
        if (key == 'value') {
          // 如果有value（表达式）
          if (val) {
            str += `(${val}),`
          }
          // 没有表达式，直接赋值一个true即可。
          else {
            str += 'true,'
          }
        } else {
          str += JSON.stringify(val) + ','
        }
      }
      str += '},'
    })

    str += '],'
  }

  return str;
}

function createRenderStrText(node: any): string {

  if (node.isComment) {
    //return JSON.stringify(node.text)
    return ''
  }
  else {
    return node.text
  }
}




export { ast2render }
