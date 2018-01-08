/* @flow */
import { log } from '../util'
import { HTMLParser, HTMLtoXML, HTMLtoDOM } from './htmlparser'
import { parseText } from '../util/text-parser'

//D:\OutPut\VUE\vue\src\compiler\parser\index.js
function html2ast(templte: string): ?ASTElement {
  let root: ?ASTElement
  let parent: ASTElement
  let parentStack = []

  HTMLParser(templte, {
    start: function (tag, attrs, unary) {
      //
      if (false === unary && parent) {
        parentStack.push(parent)
      }

      let e = createASTElement(tag, attrs, parent)

      if (!root) {
        root = e
      }

      if (false === unary) {
        parent = e
      }
    },
    end: function (tag) {
      parent = parentStack.pop()
    },
    chars: function (text) {
      createTextlement(text, parent)
    },
    comment: function (text) {
      createCommentlement(text, parent)
    }
  })

  log('htmlparser ast', root)
  log('htmlparser parentStack', parentStack)
  return root
}

function createASTElement(
  tag: string,
  attrs: Array<Attr>,
  parent: ?ASTElement
): ASTElement {
  let e = {
    type: 1,
    tag,
    //attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    //parent,
    children: []
  }

  if (parent) {
    parent.children.push(e)
  }

  return e
}

function createTextlement(
  text: string,
  parent: ASTElement
): ASTText {
  let res = parseText(text, defaultTagRE)

  if (res) {
    text = res.expression
  }
  else {
    text = JSON.stringify(text)
  }

  let e = {
    type: 3,
    text,
    //parent
  }

  parent.children.push(e)

  return e
}

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

function createCommentlement(
  text: string,
  parent: ASTElement
): ASTText {
  let e = {
    type: 3,
    text,
    isComment: true,
    //parent
  }

  parent.children.push(e)

  return e
}

function makeAttrsMap(attrs: Array<Object>): Object {
  const map = {}
  for (let i = 0, l = attrs.length ;i < l ;i++) {
    map[attrs[i].name] = attrs[i].value
  }
  return map
}

export { html2ast }
