// 实现一个add(1)(2), add(1,3)
function add() {
  const args = Array.prototype.slice.call(arguments)
  function fn() {
    const fn_args = Array.prototype.slice.call(arguments)
    return add.apply(null, args.concat(fn_args))
  }
  fn.valueOf = () => {
    return args.reduce((sum, item) => sum + item)
  }
  return fn
}

// console.log(add(1, 2, 3) + 1)

Array.prototype.myMap = function (callback, context) {
  // const arr = Array.from(this)
  const arr = Array.prototype.slice.call(this)
  const len = arr.length
  const mapArr = []
  for(let i = 0;i < len;i++) {
    mapArr.push(callback.call(context, arr[i], i, this))
  }
  return mapArr
}

Array.prototype.myReduce = function (callback, init) {
  const arr = Array.prototype.slice.call(this)
  const len = arr.length
  if(!len || init === undefined) {
    return new TypeError('参数')
  }
  let res = init ? init : arr[0]
  const startIndex = init ? 0 : 1
  for(let i = startIndex;i < len;i++) {
    res = callback.call(null, res, arr[i], i, this)
  }
  return res
}

// 实现千位分隔符
function qianweifenkewu(num) {
  num = num.toString().split('.')
  const arr = num[0]
  const len = arr.length
  let res = []
  for(let i = len - 1;i >= 0;i--) {
    if((len - 1 - i) % 3 === 0 && len - 1!== i) {
      res.unshift(',')
    }
    res.unshift(arr[i])
  }
  if(num[1]) {
    res = res.join(('')).concat('.' + num[1])
  } else {
    res = res.join('')
  }

  return res
}

// console.log(qianweifenkewu(212345678))

function qianweifenkewu1(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, '.');
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
  return integer
}
// console.log(qianweifenkewu1(12345678))

function qianweifenkewu13(num) {
  return num.toLocaleString()
}

// console.log(qianweifenkewu13(12345678))

// 实现flat函数
// Array.prototype.flat()
// let ary = [1, [2, [3, [4, 5]]], 6];
// let str = JSON.stringify(ary);
// ary = str.replace(/(\[|\])/g, '').split(',')
// console.log(ary)

function observe(target) {
  if(target && typeof target === 'Object') {
    Object.keys(target).forEach(((key) => {
      defineReactive(target, key, target[key])
    }))
  }
}

function defineReactive(target, key, value) {
  const dep = new Dep()
  observe(value)
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get() {
      if(Dep.self) {
        dep.addItem(Dep.self)
      }
      return value
    },
    set(newValue) {
      if(value === newValue) {
        return
      }
      return dep.notify()
    }
  })
}

function Dep() {
  this.items = []
}

Dep.prototype.addItem = function (item) {
  this.items.push(item)
}

Dep.prototype.notify = function () {
  this.items.forEach((item) => {
    item.update()
  })
}
function Watcher(_this, key, fun) {
  this.fun = fun;			//订阅者要触发的回调函数
  this._this =_this;		//订阅者订阅的对象
  this.key = key;			//订阅者订阅的key
  this.value = this.get();
}

Watcher.prototype = {
  update() {
    this.run()
  },
  run() {
    const value = this._this.data[this.key]
    const oldValue = this.value
    if(value !== oldValue) {
      this.value = value
      this.fn.call(this._this, value, oldValue)
    }
  },
  get() {
    Dep.self = this
    const value = this._this.data[this.key]
    Dep.self = null
    return value
  }
}

function quickSort(list) {
  var n = list.length;
  if (n <= 1) return list;

  var midIndex = Math.floor(n / 2);
  var midVal = list[midIndex]; // 取中间的数
  var left = [];
  var right = [];

  for (var i = 0; i < n; i++) {
    if (i === midIndex) continue;
    if (list[i] < midVal) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }

  // 递归
  return quickSort(left).concat(midVal,quickSort(right));
}

// console.log(quickSort([8,7,6,5,4,3,2,1]))

// 非彼拿起数列
function feibinaci(num) {
  if(num === 1 || num ===2 ) {
    return num
  }

  return feibinaci(num - 1) + feibinaci(num - 2)
}

function weidiguifei(num, a = 1, b = 2) {
  if(num === 1) {
    return a
  }
  if(num === 2) {
    return b
  }

  return weidiguifei(num - 1, b, a + b)
}
//
// console.log(weidiguifei(5))
// console.log(feibinaci(5))

function maxSum3(arr = []) {
  let tempSum = 0;
  let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    tempSum = Math.max(tempSum + arr[i], arr[i]);
    maxSum = Math.max(tempSum, maxSum)
  }
  return maxSum;
}

console.log(maxSum3([-2,1,3,-1,-6]))
