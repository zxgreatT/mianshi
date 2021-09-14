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
 *
 */
