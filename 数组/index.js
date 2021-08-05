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
// var a = 1
// function fo() {
//     var a = 2
//     var f1 = new Function(`console.log(${a})`)
//     f1(a)
// }
// console.log(fo())


/**
 * 给你两个有序整数数组 nums1 和 nums2 ，请你将 nums2 合并到 nums1 中，使 num1 成为⼀个有序数组。
 * 初始化 nums1 和 nums2 的元素数ᰁ分别为 m 和 n 。 你可以假设 nums1 有⾜够的空间（空间
 * ⼤⼩⼤于或等于 m + n ）来保存 nums2 中的元素。 leetcode 88
 * @example 
 * 输⼊:
 *  nums1 = [1,2,3,0,0,0], m = 3
 *  nums2 = [2,5,6], n = 3
 *  输出: [1,2,2,3,5,6]
 */
const nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// const nums1 = [0], m = 0, nums2 = [2], n = 1
function merageSortArr(nums1, m, nums2, n) {
    let i = 0
    let j = 0
    const result = []
    nums1.splice(m)
    while(i + j < m + n) {
        console.log(i , j)
        if(nums1[i] < nums2[j]) {
            result.push(nums1[i++])
        } else {
            result.push(nums2[j++])
        }
    }
    nums1 = result
    console.log(nums1)
}
merageSortArr(nums1, m, nums2, n)
console.log(nums1)