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
console.log(youhuaJump(5,5))
