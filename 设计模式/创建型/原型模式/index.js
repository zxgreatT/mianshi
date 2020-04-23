/**
 * 用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象
 */
var prototype = {
    name: 'tzx',
    getName() {
        return this.name
    }
}
var obj = Object.create(prototype,{
    job: {
        value: 'it'
    }
})
console.log(obj.getName(),obj.job,obj.__proto__ === prototype,{}.__proto__ === Object.prototype)
// 判断是否在原型链上的方法 
console.log(Object.prototype.isPrototypeOf(obj))
// instance 运算符用来检测和构造函数的prototype属性是否出现在某个实例的原型链上
console.log({} instanceof Object)
// 返回指定对象的原型
console.log(Object.getPrototypeOf(obj) === obj.__proto__)
// 设置一个对象的原型
var obj1 = {}
var prototype1 = {}
Object.setPrototypeOf(obj1,prototype1)
console.log(obj1.__proto__ === prototype1)