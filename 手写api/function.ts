// 防抖函数
// function debounce(fn: Function, delay: number) {
//     let timer: number | null = null
//     return function (this: unknown, ...args: any[]) {
//         if(timer) clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn.apply(this, args)
//         }, delay)
//     }
// }

// function test(this: any, a: number) {
//     this.b = a
// }
// const testObj = {
//     a: 1
// };
// test.call(testObj, 1)
// console.log(testObj)
// console.log(debounce(test, 100)(1))
// 节流 开关概念
// function throttle(fn: Function, delay = 100): Function {
//     let flag = true
//     return function (this: unknown, ...args: any[]) {
//         if(!flag) {
//             return
//         }
//         flag = false
//         setTimeout(() => {
//             fn.apply(this, args)
//             flag = true
//         }, delay)
//     }
// }

// 实现lru算法缓存策略
// class lrucache{
//     maxlength: number
//     map: Map<any, any>
//     constructor(length: number) {
//         this.maxlength = length
//         this.map = new Map()
//     }
//     get(key: any) {
//         const map = this.map
//         if(map.has(key)) {
//             const value = map.get(key)
//             map.delete(key)
//             map.set(key, value)
//             return value
//         }
//         return -1
//     }
//
//     set (key: any, value: any) {
//         const {map, maxlength} = this
//         if(map.has(key)) {
//             map.delete(key)
//             map.set(key, value)
//         } else if(map.size < maxlength) {
//             map.set(key, value)
//         } else {
//             map.delete(map.keys().next().value)
//             map.set(key, value)
//         }
//     }
//
// }
// let cache = new lrucache(2);
// cache.set(1, 1);
// cache.set(2, 2);
// console.log("cache.get(1)", cache.get(1))// 返回  1
// cache.set(3, 3);// 该操作会使得密钥 2 作废
// console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
// cache.set(4, 4);// 该操作会使得密钥 1 作废
// console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
// console.log("cache.get(3)", cache.get(3))// 返回  3
// console.log("cache.get(4)", cache.get(4))// 返回  4


/**
 *  event bus既是node中各个模块的基石，又是前端组件通信的依赖手段之一，同时涉及了订阅-发布设计模式，是非常重要的基础
 */


// 实现一个instanceof
// function myInstanceof(obj: object, fun: Function) {
//     // let proto = Object.getPrototypeOf(obj)
//     let proto = Reflect.getPrototypeOf(obj)
//     while (proto) {
//         if (proto === fun.prototype) return true
//         proto = Reflect.getPrototypeOf(proto)
//     }
//     return false
// }

// console.log(myInstanceof([], Number))


// 实现一个new
// function createNew(fn: Function, ...args: any[]) {
//     const obj = Object.create(fn.prototype)
//     const res = fn.apply(obj, args)
//     return typeof res === 'object' ? res : obj
// };

// 手写一个call方法
// Function.prototype.call = function (this: unknown, obj: any, ...args: any[]) {
//     let key = Symbol(1)
//     obj[key] = this
//     const result = obj[key](...args)
//     Reflect.deleteProperty(obj, key)
//     return result
// }

// 手写bind
// Function.prototype.bind = function (content: Object, ...args: any[]): Function {
//     const fn: any = this
//     return function F(this: any, ...args1: any[]) {
//         if(this instanceof F) {
//             return new fn(...args, ...args1)
//         }
//         return fn.apply(content, [...args, ...args1])
//     }
// }

// Function.prototype.bind = function (context, ...outerArgs) {
//     // this->func context->obj outerArgs->[10,20]
//     let self: any = this
//
//     // 返回一个函数
//     return function F(this: unknown, ...innerArgs: any) { //返回了一个函数，...innerArgs为实际调用时传入的参数
//         // 考虑new的方式
//         if(this instanceof F) {
//             return new (self as any)(...outerArgs, ...innerArgs)
//         }
//         // 把func执行，并且改变this即可
//         return self.apply(context, [...outerArgs, ...innerArgs]) //返回改变了this的函数，参数合并
//     }
// }
// var foo = {
//     value: 1
// };
// function bar(this: any,name: string, age: number) {
//     this.habit = 'shopping';
//     console.log(this.value);
//     console.log(name);
//     console.log(age);
// }
// bar.prototype.friend = 'kevin';
//
// var bindFoo: any = bar.bind(foo, 'Jack');
// var obj = new bindFoo(20);
// // undefined
// // Jack
// // 20
// console.log(obj.habit, obj.friend)


