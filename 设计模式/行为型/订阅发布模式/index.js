/**
 * 也叫观察者模式，它定义对象之间的一种一对多的依赖关系，当一个对对象的状态发生改变的时候
 * 所有依赖他的对象都将会得到通知
 */

class Event {
    constructor() {
        this.eventTypeObj = {}
    }
    on(eventType, fn) {
        if(!this.eventTypeObj[eventType])
            this.eventTypeObj[eventType] = []
        this.eventTypeObj[eventType].push(fn)
    }
    emit() {
        const eventType = Array.prototype.shift.call(arguments)
        const fnList = this.eventTypeObj[eventType] 
        if(Array.isArray(fnList)) {
            for(const fn of fnList) {
                fn.apply(fn, arguments)
            }
        }
    }
}