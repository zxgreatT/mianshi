// 工厂模式中，我们创建对象时不会对客户端暴露创建罗技，并且是通过一个共同接口来指向新创建的对象，用工厂模式方法代替new操作的一种模式
class Creator {
    creat(name) {
        return new Animal(name)
    }
}
class Animal {
    constructor(name) {
        this.name = name
    }
}

var creator = new Creator()
var duck = creator.creat('duck')
console.log(duck.name)