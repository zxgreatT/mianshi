// var triangle = {a: 1, b: 2, c: 3};
//
// function ColoredTriangle() {
//   this.color = 'red';
// }
//
// ColoredTriangle.prototype = triangle;
//
// var obj = new ColoredTriangle();
//
// for (var prop in obj) {
//   if (obj.hasOwnProperty(prop)) {
//     console.log(`obj.${prop} = ${obj[prop]}`);
//   }
// }

//createComparisonFunction函数的作用是通过传入的对象的不同的属性名从而比较该属性值的大小。
// var o1 = {
//   a:1,
//   b:2
// };
//
// var o2 = {
//   a:1,
//   b:2
// };
//
// function createComparisonFunction(propertyName) {
//   return function(){
//     var value1 = o1[propertyName];
//     var value2 = o2[propertyName];
//     if (value1 < value2){
//       return -1;
//     } else if (value1 > value2){
//       return 1;
//     } else {
//       return 0;
//     }
//   };
// }
// var fun = createComparisonFunction('a');
// console.log(fun());

// function createFunction(){
//   var result=new Array();
//
//   for(let i=0;i<10;i++){
//     result[i]=function(){
//       return i;
//     }
//   }
//   return result;
// }
//
// var res=createFunction();
// for(var i=0;i<10;i++){
//   console.log(res[i]());
// }

// 作用域相关
// 'use strict'
// var a = 1
// console.log(a)
// function b ()
// {
//   console.log(a)
//
//   a = 2
//   console.log(a)
//
//   function a() {}
//   console.log(a)
//
//   a = 3
//   console.log(a)
// }
// b()
// console.log(a)
var fn = null;
function foo() {
  var a = 2;
  function innnerFoo() {
    console.log(c); // 在这里，试图访问函数bar中的c变量，会抛出错误
    console.log(a);
  }
  fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
  var c = 100;
  fn(); // 此处的保留的innerFoo的引用
}

foo();
bar();
