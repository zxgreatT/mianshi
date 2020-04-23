let fs = require('fs')

// console.log(1)
// try{
//     fs.readFile('./data/number.txt','utf-8',(err,data) => {
//         console.log(data)
//         throw new Error('111')
//     })
// }catch(e) {
//     console.log(e,'ok')
// }
// process.on('uncaughtException',(err) => {
//     console.log(err,'obob')
// })

let sudObj = {}
const show = (obj) => {
    console.log(obj)
}
const show2 = (obj) => {
    console.log(obj,'2')
}
fs.readFile('./data/name.txt','utf-8',(err,data) => {
    if(data) sudObj.name = data
    Store.fire(sudObj)
})

fs.readFile('./data/number.txt','utf-8',(err,data) => {
    if(data) sudObj.numner = data
    Store.fire(sudObj)
})

fs.readFile('./data/fenshu.txt','utf-8',(err,data) => {
    if(data) sudObj.fenshu = data
    Store.fire(sudObj)
})

// const after = (times, fn) => {
//     return function() {
//         --times === 0 && fn.apply(null,arguments)
//     }
// }

// const newShow = after(3,show)

// 发布订阅
let Store = {
    list: [],
    times: 3,
    subscribe(func) {
        this.list.push(func)
        return this
    },
    fire(...args) {
        --this.times === 0 && this.list.forEach((ele) => {
            ele.apply(ele, args)
        })
    }
}

Store.subscribe(show).subscribe(show2)
