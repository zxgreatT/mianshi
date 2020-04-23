/**
 * 迭代器模式是指一种方法顺序访问一个聚合对象的各个元素，而又不需要暴露该对象的内部表示，
 * 迭代器模式可以吧迭代器的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造你也可以
 * 顺序访问其中的每个元素
 */
class Creater {
    constructor(list) {
        this.list = list
    }
    // 创建一个迭代器，也叫遍历器
    createItreator() {
        return new Iterator(this)
    }
}

class Iterator {
    constructor(creater) {
        this.list = creater.list
        this.index = 0
    }
    isDone() {
        if(this.index >= this.list.length)
            return true
        return false
    }
    next() {
        return this.list[this.index++]
    }
}

var arr = [1,1,2,4,5]
// var creater = new Creater(arr)
// var iterator = creater.createItreator()
// while (!iterator.isDone()) {
//     console.log(iterator.next()) 
// }
var iterator = arr[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next(),iterator.next(),iterator.next())

let set = new Set([1,2,3,4])
let a = set.entries()
let b = set.keys()
console.log(a.next(),b.next(),b.next())

function OuterIterator(o) {
    let index = 0
    const next = () => {
        return {
            value: o[index++],
            done: o.length === index
        }
    }
    return {
        next
    }
}

let oit = OuterIterator([1,3,4,5,5,5])
console.log(oit.next(),oit.next(),oit.next(),oit.next(),oit.next(),oit.next(),oit.next())

let newObj = {a:1,b:2}
for(var i in newObj) {
    console.log(i)
}

function a(i) {
    console.log(i)
    console.log(arguments[0])
    var i = 0
    console.log(i)
    console.log(arguments[0])
}
a(10)