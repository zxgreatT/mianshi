// 问题：一只青蛙一次可以跳上一级台阶，也可以跳上两级台阶。求该青蛙跳上n级台阶总共有多少种跳法？
let qingwaJump = function(n) {
    if(n === 1 || n === 2 || n === 3) {
        return n
    }
    return qingwaJump(n-1)+qingwaJump(n-2)
}

// 进行优化
let youhuaJump = function(n, i, pre=1, cur=1) {
    if(i === 1) {
        return cur
    }
    return youhuaJump(n, i-1, cur, cur+pre)
}
// console.log(youhuaJump(5,5))

// 判断一个数是否是回文数
function checkPalindrom(str) {
    return str.split('').reverse().join('') === str
}
function checkPalindrom1(str) {
    const length = str.length
    for(let i = 0;i < length / 2;i++) {
        // console.log(str[i],length-i)
        if(str[i] !== str[length-i -1]) {
            return false
        }
    }
    return true
}

// console.log(checkPalindrom1('1233333321'))
// 去掉一组整形重复的的数值
function unique(arr) {
    let obj = {}
    let result = []
    for(let val of arr) {
        if (!obj[val]) {
            obj[val] = 1
            result.push(val)
        }
    }
    return result
}
// console.log(unique([1,1,1,1,3,3,3,2,2,3,5,5,5]))
// 统计一个字符串出现最多的次数
function findMaxDuplicateChar(str) {
    let obj = {}
    for(let val of [...str]) {
        if(obj[val]) {
            obj[val]++
        } else {
            obj[val] = 1
        }
    }
    let temp = 0
    for(let key in obj) {
        if(temp < obj[key]) {
            temp = obj[key]
        }
    }
    return temp
}

// console.log(findMaxDuplicateChar('asssaddddd'))
// 冒泡排序
function bubbleSort(arr) {
    const length = arr.length
    for(let i = 0;i < length;i++) {
        for(let j = i + 1;j < length;j++) {
            if(arr[i] > arr[j]) {
                let temp = arr[i]
                arr[i] = arr[j] 
                arr[j] = temp
            }
        }
    }
    return arr
}
// console.log(bubbleSort([1,2,5,9,3,1,3,5,10,1,2]))
// 不借助临时变量, 进行整数的交换
function swap(a, b) {
    b = b - a
    a = a + b
    b = a - b
    return [a, b]
}

// 找出正整数的差值
function getMaxProfit(arr) {
    let minPrace = arr[0]
    let maxValue = 0
    for(let val of arr) {
        minPrace = Math.min(minPrace, val)
        let temp = val - minPrace
        maxValue = Math.max(temp, maxValue)
    }
    return maxValue
}
// console.log(getMaxProfit([1,1,2,3,4,7,10]))
// 随机生成指定长度的字符串
function ramdomString(num) {
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
    let temp = ''
    for(let i = 0;i<num;i++) {
        temp += str.charAt(Math.floor(Math.random() * str.length))
    }
    return temp
}
console.log(ramdomString(5))

// 数组的拍平处理去除重复字段和排序
const testArr = [1,3,4,[2,3,4],1,2,4,9,10,12,3,4,[2,4,11]]










