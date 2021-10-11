function test() {
  const a = 1
  return function () {
    return 1
  }
}

const c = test()
c()

// var theThing = null;
// var replaceThing = function () {
//   var originalThing = theThing;
//   var unused = function () {
//     if (originalThing)
//       console.log("hi");
//   };
//   theThing = {
//     longStr: new Array(1000000).join('*'),
//     someMethod: function () {
//       console.log(someMessage);
//     }
//   };
// };
// setInterval(replaceThing, 1000);

// Function.prototype.myCall = function (context) {
//   console.log(this === Function.prototype, typeof Function.prototype)
//   if (typeof this !== 'function') {
//     console.log(1)
//     return undefined; // 用于防止 Function.prototype.myCall() 直接调用
//   }
//   const fn = Symbol();
//   context[fn] = this;
//   const args = [...arguments].slice(1);
//   const result = context[fn](...args);
//   delete context[fn];
//   return result;
// }
// Function.prototype.myCall({})
// function test() {
//
// }
// test.myCall({})

// const obj = {
//   valueOf: () => { console.log('valueOf'); return 123; },
//   toString: () => { console.log('toString'); return 'ConardLi'; },
// };
// console.log(obj - 1);   // valueOf   122
// console.log(`${obj}ConardLi`); // toString  ConardLiConardLi
//
// const obj2 = {
//   [Symbol.toPrimitive]: () => { console.log('toPrimitive'); return 123; },
// };
// console.log(obj2 - 1);   // valueOf   122
//
// const obj3 = {
//   valueOf: () => { console.log('valueOf'); return {}; },
//   toString: () => { console.log('toString'); return {}; },
// };
// console.log(obj3 - 1);
// valueOf
// toString
// TypeError
