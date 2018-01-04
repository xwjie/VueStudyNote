/* @flow */
// D:\OutPut\VUE\vue\src\platforms\web\util\index.js

/**
 * Query an element selector if it's not an element already.
 */

export function query(el: string ): string {
    return '';
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