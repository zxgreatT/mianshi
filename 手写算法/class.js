/**
 * 原型链继承
 */
// function SuperType() {
//     this.colors = ['red', 'blue', 'green'];
// }
//
// function SubType() {}
// SubType.prototype = new SuperType();
// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);
// let instance2 = new SubType();
// console.log(instance2.colors);


// function SuperType() { this.property = true; }
//
// SuperType.prototype.getSuperValue = function() { return this.property; };
//
// function SubType() { this.subproperty = false; }
//
// // 继承 SuperType
// SubType.prototype = new SuperType();
//
// // 新方法
// SubType.prototype.getSubValue = function () { return this.subproperty; };
//
// // 覆盖已有的方法
// SubType.prototype.getSuperValue = function () { return true; };
//
// let instance = new SubType()
// console.log(instance.getSuperValue())


// const a = {
//     toString() {
//         return 'hah'
//     }
// }
// const b = [1,2]
// b.toString = function () {
//     return 'hi'
// }
// console.log({}.toString.call(a), a.toString())
// console.log(Object.prototype.toString.call(b), b.toString())

// 借用构造函数继承, 在执行Child构造函数的时候，子类的实例各自得到一份构造函数的副本，属于值传递，所以子类之间的属性修改是互不相关的；
// 缺点：单独使用无法达到函数复用，因为每一个函数和属性都需要在构造函数中定义，没法复用，即没有父类prototype上的函数，只有不能共用的实例属性
// 而且instanceof操作无法确定子类实例和父类之间的关系，因为子类的prototype和父类无关
// function Parent() {
//     this.colors = ['red', 'blue', 'green'];
// }
//
// function Child() {
//     Parent.call(this);
// }
//
// let instance3 = new Child();
// instance3.colors.push('white');
// console.log(instance3.colors);
//
// let instance4 = new Child();
// console.log(instance4.colors);

// 组合继承
function father(name) {
    this.name = name
}


father.prototype = {
  say() {
    console.log(this.name)
  }
}

function son(name, age) {
  father.call(this, name)
  this.age = age
}
son.prototype = new father()

son.prototype.ask = function () {
  console.log(this.name)
}

son.prototype.ask1 = () => {
  console.log(this)
}

const sonTel = new son(3, 2)
const sonTel1 = new son(1, 5)
console.log(sonTel, sonTel1)

