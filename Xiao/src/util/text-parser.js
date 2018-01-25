
//D:\OutPut\VUE\vue\src\compiler\parser\text-parser.js
export function parseText(
  text: string,
  re: string
) {
  if (!re.test(text)) {
    return
  }
  const tokens = []
  let lastIndex = re.lastIndex = 0
  let match, index, tokenValue
  while ((match = re.exec(text))) {
    index = match.index

    // push text token
    if (index > lastIndex) {
      tokenValue = text.slice(lastIndex, index)
      tokens.push(JSON.stringify(tokenValue))
    }

    // tag token
    var exp = match[1].trim()
    tokens.push(createExpressStr(exp))

    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) {
    tokenValue = text.slice(lastIndex)
    tokens.push(JSON.stringify(tokenValue))
  }

  return {
    expression: tokens.join('+'),
  }
}

/**
 * 处理filter表达式
 * 如：message | capitalize | wrap('===')
 * @param {*} exp
 */
export function createExpressStr(exp: string): string {
  // 数组反转，然后递归生成嵌套函数调用表达式
  return wrapExpressStr(exp.split('|').reverse())
}

function wrapExpressStr(arr: Array<string>): string {
  let str = arr[0].trim()

  if (arr.length == 1) {
    return str
  }

  // 如果是有参数的filter, 如 wrap('===')
  let i = str.indexOf('(')

  if (i == -1) {
    return `_f("${str}")(` + wrapExpressStr(arr.slice(1)) + ')'
  } else {
    return `_f("${str.substr(0, i)}")(` + wrapExpressStr(arr.slice(1)) + ',' + str.substr(i + 1)
  }

}

