/**
 * 函数柯里化
 *
 */
function add(a, b, c) {
  console.log(a,b,c)
  return a + b + c;
}
// const obj = {
//   a: 1,
//   add(a, b, c) {
//     console.log()
//     return a + b + c;
//   }
// }
// function _add(a) {
//   return function(b) {
//     return function(c) {
//       return a + b + c;
//     }
//   }
// }
//
function createCurry(fn, ...args) {
  const fnLength = fn.length
  console.log(this, 1)
  return function () {
    console.log(this, 2)
    const _args = [].slice.call(arguments);
    [].push.apply(_args, args)

    if(_args.length < fnLength) {
       return createCurry(this, fn, _args)
    }

    return fn.apply(this, _args)
  }
}
const test = createCurry(add, 1,2)
console.log(test(3))

// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;

// function add() {
//   // 第一次执行时，定义一个数组专门用来存储所有的参数
//   var _args = [].slice.call(arguments);
//
//   // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
//   var _adder = function() {
//     _args.push(...arguments);
//     return _adder;
//   };
//
//   // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
//   _adder.toString = function () {
//     return _args.reduce(function (a, b) {
//       return a + b
//     })
//   }
//   return _adder;
// }
// console.log(add(1)(2)(3)) // 6
// add(1, 2, 3)(4)             // 10
// add(1)(2)(3)(4)(5)          // 15
// add(2, 6)(1)  ;
// const a = [1,2,3]
// a.forEach((i, index, arr) => {
//   arr.length = 1
//   console.log(i)
// })
// console.log(a)

