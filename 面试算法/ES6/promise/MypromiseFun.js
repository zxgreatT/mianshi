let MyPromise = require('./myPromise')

function test(delay, str) {
    return new MyPromise((res, rej) => {
        setTimeout(() => {
            res('hi:' + str)
        },delay)            
    })
}
// console.log(new MyPromise().race)
MyPromise.race([test(200, 'a'),test(300, 'b'), test(100, 'c')]).then((val) => console.log(val))
// test(1000, 'a').then((val) => console.log(val))