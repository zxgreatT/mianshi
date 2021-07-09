

/*
 * @Author: yichiyidawan 
 * @Date: 2020-03-01 17:28:43 
 * @Last Modified by: yichiyidawan
 * @Last Modified time: 2020-03-02 15:36:24
 */

function MyPromise(executor) {
    const _this = this
    this.state = 'pending'
    this.fulfilledVal = null
    this.rejectVal = null
    this.RejectCallbackLit = []
    this.ResolveCallbackList = []
    function resolve(val) {
        if (_this.state === 'pending') {
            _this.state = 'Fulfilled'
            _this.fulfilledVal = val
            _this.ResolveCallbackList.forEach(element => {
                element()
            });
        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.state = 'Reject'
            _this.rejectVal = reason
            _this.RejectCallbackLit.forEach(element => {
                element()
            })
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const _this = this
    onFulfilled = onFulfilled || function(val) {return val}
    onRejected = onRejected || function(err) {throw new Error(err)}
    const nextPromise = new MyPromise(function (res, rej) {
        if (_this.state === 'Fulfilled') {
            setTimeout(function() {
                try {
                    const nextResolveVal = onFulfilled(_this.fulfilledVal)
                    resolutionReturnPromise(nextPromise, nextResolveVal, res, rej)
                } catch (error) {
                    rej(err)
                }
            },0)
            
        }

        if (_this.state === 'Reject') {
            setTimeout(function() {
                try {
                    const nextRejectVal = onRejected(_this.rejectVal)
                    resolutionReturnPromise(nextPromise, nextRejectVal, res, rej)
                } catch (error) {
                    rej(error)
                }
            },0)
        }
        if (onFulfilled && _this.state === 'pending') {
            _this.ResolveCallbackList.push(function () {
                setTimeout(function() {
                    try {
                        const nextResolveVal = onFulfilled(_this.fulfilledVal)
                        resolutionReturnPromise(nextPromise, nextResolveVal, res, rej)
                    } catch (error) {
                        rej(error)
                    }
                },0)
            })
        }

        if (onRejected && _this.state === 'pending') {
            _this.RejectCallbackLit.push(function () {
                setTimeout(function(){
                    try {
                        const nextRejectVal = onRejected(_this.rejectVal)
                        resolutionReturnPromise(nextPromise, nextRejectVal, res, rej)
                    } catch (error) {
                        rej(error)
                    }
                },0)
            })
        }
    })

    return nextPromise
}

function resolutionReturnPromise(nextPromise, returnval, res, rej) {
    if(returnval instanceof MyPromise) {
        returnval.then((val) => {
            res(val)
        },(err) => {
            rej(err)
        })
    }else {
        res(returnval)
    }
}
// console.log('start')
// let oP = new MyPromise((res, rej) => {
//     setTimeout(() => { res(0) }, 2000)
//     console.log(3)
// }).then().then((val) => {
//     console.log(val, 'ok1')
//     return new MyPromise((res, rej) => {
//         res(45)
//     })
// }, err => console.log(err)).then(val => {
//     console.log(val, 'ok2')
// }, err => console.log(err, 'no2'))
// console.log('end')
MyPromise.race = function(promiseArr) {
    console.log('😸')
    return new MyPromise((rej, res) => {
        promiseArr.forEach((ele) => {
            console.log(1)
            ele.then(rej,res)
        })
    })
}
module.exports =  MyPromise

Promise.all = function (iterators) {
    return new Promise((resolve, reject) => {
      if (!iterators || iterators.length === 0) {
        resolve([]);
      } else {
        let count = 0; // 计数器，用于判断所有任务是否执行完成
        let result = []; // 结果数组
        for (let i = 0; i < iterators.length; i++) {
          // 考虑到iterators[i]可能是普通对象，则统一包装为Promise对象
          Promise.resolve(iterators[i]).then(
            (data) => {
              result[i] = data; // 按顺序保存对应的结果
              // 当所有任务都执行完成后，再统一返回结果
              if (++count === iterators.length) {
                resolve(result);
              }
            },
            (err) => {
              reject(err); // 任何一个Promise对象执行失败，则调用reject()方法
              return;
            }
          );
        }
      }
    });
  };

  Promise.race = function (iterators) {
    return new Promise((resolve, reject) => {
      for (const iter of iterators) {
        Promise.resolve(iter)
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      }
    });
  };
