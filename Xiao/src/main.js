// @flow
// D:\OutPut\VUE\vue\src\core\instance\index.js

import { warn } from './util'

class Xiao {

  constructor(options: Object){
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Xiao)
    ) {
      warn('Xiao is a constructor and should be called with the `new` keyword')
    }

    console.log('main start', options);
  }
}

export default Xiao;
