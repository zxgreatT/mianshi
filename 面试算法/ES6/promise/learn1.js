
/**
 * 链式操作 上一个不抛出错误的话 下一个执行then函数
 * 返回值最为下一个then注册函数的val值
 */
let oP = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() =>{
        Math.random() * 100 > 60 ? resolve('ok') : reject('no')
    },1000)
})
// oP.then((data) => {
//     console.log(data)
//     return 1
// },(err) => {
//     console.log(err)
//     return 2
// }).then((val) => {
//     console.log('ok then2 ' + val)
// },(err) => {
//     console.log('no then2 ' + err)
// })

let fs = require('fs')
const readFile = (data) => {
    return new Promise((resolve, reject) => {
        fs.readFile(data, 'utf-8', (err, data) => {
            !!data ? resolve(data) : reject(err)
        })
    })
}
readFile('./data/name.txt').then((data) => {
    return readFile(data)
},(err) => {
    console.log(err)
}).then((data) => {
    return readFile(data)
},(err) => {
    console.log(err)
}).then((data) => {
    console.log(data)
}).catch(e => console.log(e))