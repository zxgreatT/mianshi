

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
