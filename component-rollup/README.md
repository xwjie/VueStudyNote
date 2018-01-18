# rollup

[rollup](https://rollupjs.org)是一款代码打包工具，主要为了解决 `tree-shaking`。

# 安装
```
npm install rollup --global
```


# 测试

新建代码 `main.js` 和 `foo.js`

```javascript
// src/main.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```


```javascript
// src/foo.js
export default 'hello world!';
```


用以下命令来编译 

```
rollup src/main.js -f cjs
```

会直接输出到控制台：

```
src/main.js → stdout...
'use strict';

// src/foo.js
var foo = 'hello world!';

// src/main.js
function main () {
  console.log(foo);
}

module.exports = main;
created stdout in 32ms
```


可以使用 `rollup src/main.js -o bundle.js -f cjs` 输出到文件 `bundle.js` 。


# 使用配置文件

默认配置文件为 `rollup.config.js` , 使用 `rollup -c` 或者 `rollup --config` 运行。

```
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

这里还可以返回一个数组，如：

```javascript
export default [{
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
},{
  input: 'src/main.js',
  output: {
    file: 'bundle2.js',
    format: 'cjs'
  }
}];
```

更加好的习惯是把开发环境和生产环境分开配置。如 `rollup.config.dev.js` 和 `rollup.config.pro.js`。然后使用 `rollup --config rollup.config.dev.js` 运行。


# 把es6代码编译成网页引入文件

需要使用 `umd` 或者 `iife` 格式，推荐使用 `umd` 格式，此时需要制定 `name` ，就是你的模块名字，如 `Xiao`。

```
export default [{
  input: 'src/main-babel.js',
  output: {
    file: 'dist/bundle-babel.js',
    format: 'umd',
    name: 'Xiao'
  },
  plugins: [ 
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}];
```

package.json

```json
{
  "name": "component-rollup",
  "version": "1.0.0",
  "description": "rollup demo",
  "main": "bundle-babel.js",
  "dependencies": {},
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015-rollup": "^3.0.0",
    "rollup-plugin-babel": "^3.0.3",
    "rollup-plugin-node-resolve": "^3.0.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c rollup.config.dev.js"
  },
  "keywords": [],
  "author": "xwjie",
  "license": "ISC"
}

```

运行 `npm run build` 即可