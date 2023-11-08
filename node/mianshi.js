/*
 * @Description: 
 * @Author: 涧牛
 * @Date: 2023-05-23 13:48:34
 * @LastEditTime: 2023-06-16 10:10:01
 * @LastEditors: 涧牛
 */
const creatStr = (n, icon) => {
  return Array.from({length: n}).fill(icon)
}


const fn = (n) => {
  for(let i = 0;i<n;i++) {
    const space = Math.floor(n - i) / 2
    console.log(creatStr(space, ' ').join('')+ creatStr(i+ 1, '*').join('') + creatStr(space, ' ').join(''))
  }
}

fn(5)
