function MyNew() {
  const obj = {}
  const fun = [].shift.call(arguments)
  Object.setPrototypeOf(obj, fun.prototype)
  let result = fun.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log(this.name)
  }
}
MyNew(Person, 1, 2).say()