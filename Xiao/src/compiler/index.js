/* @flow */
import { html2ast } from './html2ast'
import { ast2render } from './ast2render'

function compileToFunctions(templte: string, data: Object): Object {

  const ast: ?ASTElement = html2ast(templte, data);


  const renderFunctionStr = renderToFunctions(ast2render(ast));

  return {
    render: renderFunctionStr
  };
}

function renderToFunctions(renderStr: string): Function {
  return new Function('with(this){return ' + renderStr + '}');
}

export { compileToFunctions }
