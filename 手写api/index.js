// 手写promsie.all
(() => {
  // if(Promise.all) Promise.all = myPromiseAll
  Promise.myall = myPromiseAll
  Promise.all1 = promsieAll
  Promise.all2 = promiseAll2
  Promise.allSettled1 = promiseAllSettled
  // 简单版 按照数组的形式考虑
  function myPromiseAll(iterable) {
    return new Promise((res, rej) => {
      const result = []
      const len = iterable.length
      let index = 0
      if(!len) {
        res(result)
        return
      }

      for(let i = 0;i < len; i++) {
         Promise.resolve(iterable[i]).then((data) => {
          result[i] = data
          index++
          if(index === len) res(result)
        }, (err) => {
          rej(err)
        })
      }
    })
  }
  // 复杂版 支持哪些所有的迭代对象
  function promsieAll(iterable) {
    return new Promise((res, rej) => {
      const result = []
      let index = 0
      let iterableIndex = 0
      for (const val of iterable) {
        let resIndex = iterableIndex++
        Promise.resolve(val).then((res1) => {
          result[resIndex] = res1
          index++
          if(index === iterableIndex) {
            res(result)
          }
        }).catch((err) => {
          rej(err)
        })
      }
      if(!iterableIndex) {
        res(result)
      }
    })
  }

  // 支持所有的可迭代对象
  function promiseAll2(iterable) {
    const type = Object.prototype.toString.call(iterable).slice(8, -1).toLocaleLowerCase()
    const isIterable = (typeof iterable === 'object' && iterable !== null) || (typeof iterable === 'string') && typeof iterable[Symbol.iterator] === 'function'
    if(isIterable) {
      let resCount = 0
      const promiseIterator = Array.from(iterable)
      const len = promiseIterator.length
      const result = []
      return new Promise((reslove, reject) => {
        promiseIterator.forEach((item, i) => {
          Promise.resolve(item).then((res) => {
            result[i] = res
            resCount++
            if(resCount === len){
              reslove(result)
            }
          }, (err) => {
            reject(err)
          })
        })
      })
    } else {
      throw new TypeError(`输入类型不是可迭代对象`)
    }
  }

  function promiseAllSettled(iterable) {
    return new Promise((resolve, reject) => {
      const data = [], len = iterable.length
      let count = len
      for(let i = 0; i< len; i++) {
        Promise.resolve(iterable[i]).then((value) => {
          data[i] = {
            status: 'fulfilled', value
          }
        }, (reason) => {
          data[i] = {
            status: 'rejectd', reason
          }
        }).finally(() => {
          if(!--count) {
            resolve(data)
          }
        })
      }
    })
  }
})()

const test1 = new Promise((res) => {
  setTimeout(() => {
    res(1)
  }, 1000)
})
const test2 = new Promise((res) => {
  setTimeout(() => {
    res(2)
  }, 200)
})
const test3 = new Promise((res) => {
  setTimeout(() => {
    res(4)
  }, 100)
})
// const map = new Map([[1, test1], [2, test2], [3, test3]])
// console.log(Array.from(map))
//
// const set = new Set([test1,test2,test3])
// Promise.all2('123').then((data) => {
//   console.log(data)
// })


Promise.allSettled1([test1, test2,test3]).then((data) => {
  console.log(data)
})

