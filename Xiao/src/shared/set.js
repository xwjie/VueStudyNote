/* @flow */

// D:\OutPut\VUE\vue\src\core\util\env.js
let _Set

/* istanbul ignore if */ // $flow-disable-line
// if (typeof Set !== 'undefined') {
//   // use native Set when available.
//   _Set = Set
// } else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = class Set implements SimpleSet {
    set: Object;
    constructor() {
      this.set = Object.create(null)
    }
    has(key: string | number) {
      return this.set[key] === true
    }
    add(key: string | number) {
      this.set[key] = true
    }
    clear() {
      this.set = Object.create(null)
    }
  }
// }

interface SimpleSet {
  has(key: string | number): boolean;
  add(key: string | number): mixed;
  clear(): void;
}

export { _Set }
export type { SimpleSet }
