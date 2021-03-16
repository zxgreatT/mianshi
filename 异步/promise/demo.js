// 使用promise实现每个一秒输出1，2，3
const arr = [1,2,3]
arr.reduce((p, x) => {
    return p.then(() => {
        return new Promise(r => {
            setTimeout(() => r(console.log(x)), 1000)
        })
    })
},Promise.resolve)
