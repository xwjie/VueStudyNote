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

  // snabbdom 的语法，类名放在tag上。'div#container.two.classes'
  let tag = getTagAndClassName(node)

  let str: string = `h(${tag},{`

  // 解析属性
  str += genAttrStr(node)

  // 解析指令
  str += getDirectiveStr(node)

  str += "}"

  if (node.children) {
    str += ',['

    // 保存上一次if指令，处理只有if没有else的场景
    let lastDir

    node.children.forEach(child => {
      // 如果这里节点有if指令
      let dir = getIfElseDirective(child)

      console.log('dir:', dir)

      if (dir) {
        if (dir.name == 'if') {
          str += `(${dir.exp})?`
          lastDir = dir
        } else if (dir.name == 'else') {
          str += `:`
        }
      }

      str += createRenderStr(child)

      if (dir) {
        if (dir.name == 'else') {
          str += `,`
          lastDir = null
        }
      }
      else if (lastDir) {
        str += `:"",`
        lastDir = null
      }
      else{
        str += `,`
      }
    })

    if (lastDir) {
      str += `:"",`
    }

    str += ']'
  }

  str += ')'

  return str
}


/**
 * 得到该节点的if/else指令
 * @param {*} node
 */
function getIfElseDirective(node: any): ?Object {
  let attrs = node.attrsMap

  if (!attrs) {
    return
  }

  let dir

  // why not use for..in, see eslint `no-restricted-syntax`
  Object.keys(attrs).some(attrname => {
    // 如果是数据绑定，则后面的是表达式
    if (attrname == 'x-if') {
      dir = {
        name: 'if',
        exp: attrs[attrname].trim()
      }
      return true
    } else if (attrname == 'x-else') {
      dir = {
        name: 'else'
      }
      return true
    }

    return false
  })

  return dir
}


/**
 * 得到带类名的TAG名
 *
 * 返回如 “div.classes” （静态） 或者 “div." + nowClass (动态)
 *
 * TODO : 没有支持id和多class 如 'div#container.two.classes'
 *
 */
function getTagAndClassName(node: any) {
  let tag = JSON.stringify(node.tag)
  let attrs = node.attrsMap

  if (!attrs) {
    return tag
  }

  //FIXME 大小写会有bug

  // 如果有class属性
  let v = attrs['class']
  if (v) {
    return JSON.stringify(node.tag + '.' + v)
  }

  // 如果有动态绑定的class属性
  v = attrs[':class']

  if (v) {
    return JSON.stringify(node.tag + '.') + '+' + v
  }

  return tag
}

/**
 * 解析属性
 * @param {*} node
 */
function genAttrStr(node: any) {
  let attrs = node.attrsMap

  if (!attrs) {
    return ""
  }

  let propsStr: string = ''
  let styleStr: string = ''
  let onStr: string = ''

  // why not use for..in, see eslint `no-restricted-syntax`
  Object.keys(attrs).forEach(attrname => {
    let str = ''
    let isEvent = false
    const val = attrs[attrname].trim()

    // 如果是数据绑定，则后面的是表达式
    if (attrname.charAt(0) == ':') {
      str = JSON.stringify(attrname.substr(1)) + ':' + val + ','
      attrname = attrname.substr(1).toLocaleLowerCase()
    }
    else if (attrname.charAt(0) == '@') {
      str = JSON.stringify(attrname.substr(1)) + ':' + getFunctionStr(val) + ','
      isEvent = true
      attrname = attrname.substr(1).toLocaleLowerCase()
    }
    else {
      str = JSON.stringify(attrname) + ':' + JSON.stringify(val) + ','
    }

    // class已经处理了。
    if (attrname !== 'class') {
      if (isEvent) {
        onStr += str
      } else if (isStyle(attrname)) {
        styleStr += str
      }
      else {
        propsStr += str
      }
    }
  })

  let str = '';

  if (propsStr != '') {
    str += `props:{${propsStr}},`
  }

  if (styleStr != '') {
    str += `style:{${styleStr}},`
  }

  if (onStr != '') {
    str += `on:{${onStr}},`
  }

  return str;
}

function isStyle(name: string) {
  return name === 'style'
}

function isFuncNameStr(name: string): boolean {
  return /[-A-Za-z0-9_]+$/.test(name)
}

function getFunctionStr(funcStr: string): string {
  // 如果只是函数名，加一个（）调用
  if (isFuncNameStr(funcStr)) {
    funcStr += '(event)'
  }

  return `function($event){${funcStr}} `
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
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i]


      if (dir.name == 'x-if' || dir.name == 'x-else') {
        continue
      }

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
    }

    str += '],'
  }

  return str
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
