/**
 * 实现一个防抖函数debounce
 * 所谓防抖，就是指触发事件后再n秒内函数只能执行一次，如果有n秒之内有触发了事件，则会重新计算函数的执行时间
 */
function debounce(fn, delay) {
    let timeout
    return function() {
        let context = this
        let args = arguments
        
        if(timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fn.apply(context, args)
        },delay)
    }
}

/**
 * 节流(throttle) 所谓节流就是指连续触发事件但是在n秒中执行一次函数
 */
function throttle(fn,delay) {
    let flag = true
    return function() {
        if(!flag) {
            return
        }
        flag = false
        setTimeout(() => {
            fn()
            flag = true
        }, delay)
    }
}

// 手写Object.create
function _create(obj) {
    function buffer() {}
    buffer.prototype = obj
    return new buffer()
}

// 实现一个睡眠函数
function sleep(s) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve)
    })
}

// instanceof函数
function _Instanceof(obj, fn) {
    while(true) {
        if(obj.__proto__ === null) return false
        if(obj.__proto__ === fn.prototype) return true
        obj = obj.__proto__
    }
}

// call 函数
Function.prototype._call = function() {
    let obj = Array.from(arguments)[0] || window
    let arg = Array.from(arguments).slice(1)
    let key = Symbol()
    let result
    obj[key] = this
    result = obj[key](...arg)
    delete obj[key]
    return result
} 
// 手写bind函数