// @flow
function check(n: number): MyType {
  if( n > 0){
    return {
      code: 0
    }
  }
  else{
      return {
        code: 1,
        msg: 'number must > 0'
      };
  }
}

check(2); 
check(-2); 