// 数组扁平化
// const arr = [1,1,2,3,[1,1,1,[1,2,3,3],3],5]
// const arrBianPing = (arr) => {
//     let tempArr = []
//     for (let val of arr) {
//         if(Object.prototype.toString.call(val) === '[object Array]') {
//             tempArr = tempArr.concat(arrBianPing(val)) 
//         } else {
//             tempArr.push(val)
//         }
//     }
//     return tempArr
// } 

// console.log(arrBianPing(arr))
// console.log( 0.2 + 0.4 === 0.6)
var a = 1
function fo() {
    var a = 2
    var f1 = new Function(`console.log(${a})`)
    f1(a)
}
console.log(fo())