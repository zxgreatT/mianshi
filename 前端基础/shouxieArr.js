/**
 * es5数组方法改变自身, pop 出栈 push入栈  shift出队列的方法 unshift出队里的方法
 *
 */


Array.prototype.myMap = function (fn, context) {
  const arr = this
  const result = []
  let i, len = arr.length
  for(i = 0;i<len;i++) {
    result.push(fn.call(context ,arr[i], i, arr))
  }
  return result
}

Array.prototype._map = function (fn, context) {
  const arr = this
  return arr.reduce(function (accum, cur, curIndex, arr) {
    accum.push(fn.call(context, cur, curIndex, arr))
    return accum
  }, [])
}

const arr = [1,2,3,4]
const obj = {a: '2'}
var test = arr._map(function (item){
  return item + this.a
}, obj)
// console.log(test)


Array.prototype.map.call('123', console.log)

  const test1 = '12345';
[...test1].map(console.log)


