/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？ 其实也就是菲薄那次
 */
// 普通的递归方法
function climbStairs1(n) {
  if(n <= 2) return n
  return climbStairs1(n - 1) + climbStairs1(n - 2)
}

// 尾递归优化 在es6de 严格模式下v8引擎会进行尾递归优惠防止爆栈的操作
function climbStairs2(n, a = 1, b = 2) {
  if(n <= 1) {
    return a
  }
  return climbStairs2(n - 1, b, a + b)
}
// console.time('1')
// climbStairs1(20)
// console.timeEnd('1')
// console.time('2')
climbStairs2(20)
// console.timeEnd('2')

function cloneMap(map) {
  return new Map(JSON.parse(JSON.stringify([...map])))
}
const map = new Map([[1,2], ['a', {}]])
const newMap = cloneMap(map)
console.log(newMap.get('a') ===  map.get('a'))
