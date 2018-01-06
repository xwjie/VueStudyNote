
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
        var exp = match[1].trim();
        tokens.push(exp);

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
