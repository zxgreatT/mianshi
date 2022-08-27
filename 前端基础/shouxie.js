/**
 * 防抖 在事件触发n秒后在执行回调，在这n秒内在执行则从新计算时间
 */
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


/**
 * 节流
 *  在规定时间内，只能触发一次函数，如果这个单位时间内触发多次函数，只有一次生效
 */
function throtle(fn, delay) {
  let flag = null
  return function (...args) {
    if(!flag) {
      flag = true
      setTimeout(() => {
        fn.call(this, ...args)
        flag = false
      }, delay)
    } else {
      return
    }
  }
}

// 手写instanceof
function myInstanceof(a, b) {
  let proto = Object.getPrototypeOf(a)
  while(true) {
    if(!proto) {
      return false
    }

    if(proto === b.prototype) return true

    proto = Object.getPrototypeOf(proto)
  }
}

