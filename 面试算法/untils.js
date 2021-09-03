class PrimitiveNumber {
    static [Symbol.hasInstance](x) {
        return typeof x === 'number'
    }
}
// console.log(111 instanceof PrimitiveNumber) // true

// 手动实现一个intanceof的功能
function myIntanceof(son, father) {
    // 基本类型直接返回false
    if (typeof son !== 'object' || son === null) {
        return false
    }
    let proto = Object.getPrototypeOf(son)
    while (true) {
        if (proto === null) {
            return false
        }
        if (proto === father.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
}


function is(x, y) {
    debugger
    if (x === y) {
      //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
      return 1 / x === 1 / y;
    } else {
      //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
      //两个都是NaN的时候返回true
      return x !== x && y !== y;
    }
}
is(5,-5)
// console.log(is(5,-5))
