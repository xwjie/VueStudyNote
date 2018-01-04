/* @flow */
// D:\OutPut\VUE\vue\src\platforms\web\util\index.js

import { warn, log } from './debug'

/**
 * Query an element selector if it's not an element already.
 */

// D:\OutPut\VUE\vue\src\platforms\web\util\index.js
export function query(el: string | Element): Element {
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            process.env.NODE_ENV !== 'production' && warn(
                'Cannot find element: ' + el
            )
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}

// D:\OutPut\VUE\vue\src\platforms\web\entry-runtime-with-compiler.js
export function getOuterHTML(el: Element): string {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}

// export function query (el: string | Element): Element {
//     if (typeof el === 'string') {
//       const selected = document.querySelector(el)
//       if (!selected) {
//         process.env.NODE_ENV !== 'production' && warn(
//           'Cannot find element: ' + el
//         )
//         return document.createElement('div')
//       }
//       return selected
//     } else {
//       return el
//     }
//   }