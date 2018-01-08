/* @flow */
import { html2ast } from './html2ast'
import { ast2render } from './ast2render'

function compileToFunction(templte: string): Object {
  const ast: ?ASTElement = html2ast(templte)
  const renderFunctionStr = renderToFunction(ast2render(ast))

  return {
    render: renderFunctionStr
  }
}

function renderToFunction(renderStr: string): Function {
  return new Function(`with(this){return ${renderStr}}`)
}

export { compileToFunction }
