/**
 * 定义一系列的算法，把他们疯转起来，并且可以替换
 */
var fnA = (val) => val * 1
var fnB = val => val * 2
var fnC = val => val * 3
var calculate = (fn,val) => fn(val)
console.log(calculate(fnA, 100))// 100
console.log(calculate(fnB, 100))// 200
console.log(calculate(fnC, 100))// 300