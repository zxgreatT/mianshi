const getSingle = function (fn) {
    let result;
    return function () {
        return result || (result = fn.apply( this, arguments));
    }
}
class Abc {

}
let test = getSingle((a)=>{console.log(a)})
const test1 = test('123')
const test2 = test('456')
console.log(test1,test2)

var HeadClass = function () { };
var Head = (function () { // 匿名自执行函数
    var instance; // 声明一个instance对象
    return function (Obj) {
        if (instance) { // 如果已存在 则返回instance
            return instance;
        }
        instance = new Obj() // 如果不存在 则new一个HeadClass对象
        return instance;
    }
})();
var a = new Head(Abc);
var b = new Head(Abc);
console.log(a===b,a) // true

// 手写一个new操作符 一个参数是构造函数 其他的是参数
function creat() {
    let obj = {}
    const Fun = [].shift.call(arguments)
    obj.__proto__ = Fun.prototype
    let result = Fun.apply(obj,arguments)
    return typeof result === 'object' ? result : obj
}

function foo(a) {
    this.a = a
    var c = 1
}

console.log(new foo('1'))