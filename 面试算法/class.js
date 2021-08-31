// class Person {
//     say() {
//         console.log(this)
//     }
// }
//
// new Person().say()
//
// function say() {
//     console.log(this)
// }
// say()
//
// const  test = Person.prototype.say
// test()
const iterator = {
  *[Symbol.iterator]() {
    yield 1
    yield 2
  }
}
console.log(iterator[Symbol.iterator]().next())
