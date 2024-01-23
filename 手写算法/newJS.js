// function MyNew() {
//   const obj = {}
//   const fun = [].shift.call(arguments)
//   Object.setPrototypeOf(obj, fun.prototype)
//   let result = fun.apply(obj, arguments)
//   return result instanceof Object ? result : obj
// }
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.say = function () {
//     console.log(this.name)
//   }
// }
// MyNew(Person, 1, 2).say()

var twoSum = function(nums, target) {
  let i = 0
  let j = (nums.length - 1) < 1 ? [] : (nums.length - 1)
  let sum = null
  while(i < j) {
    sum = nums[i] + nums[j]
    if(sum === target) return [i, j]
    else if (sum < target) { i++ }
    else { j-- }
  }
  return []
};

console.log(twoSum([3,2,4], 6))


