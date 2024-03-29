// 浅拷贝
function shallowCopy(obj) {
  const retObj = {}
  for(const key in obj) {
    if(obj.hasOwnProperty(key)) {
      retObj[key] = obj[key]
    }
  }
  return retObj
}

var testObj = {
  'name': 'currName',
  'nums': [1, [2, 3]],
  'objs': {
    'innerobj': 'content'
  }
}

// 循环引用的问题
// let obj = {
//   reg : /^asd$/,
//   fun: function(){},
//   syb:Symbol('foo'),
//   asd:'asd'
// };
// let cp = JSON.parse(JSON.stringify(obj));
// // console.log(cp);
//
//
// function isObject(obj) {
//   return obj !== null && typeof obj === 'object'
// }
//
// function cloneDeep(target) {
//   if(!isObject(target)) {
//     return target
//   }
//   let result = Array.isArray(target) ? [] : {}
//   const keys = Object.keys(target)
//   for(let i = 0;i < keys.length;i++) {
//     result[keys[i]] = cloneDeep(target[keys[i]])
//   }
//   return  result
// }

// console.log(testObj, cloneDeep(testObj))
// 解决深度clone循环引用的相同引用的问题
// function deepCopy(target){
//   let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
//   function _deepCopy(target){
//     if((typeof target !== 'object')||!target){return target;}
//     for(let i= 0 ;i<copyed_objs.length;i++){
//       if(copyed_objs[i].target === target){
//         return copyed_objs[i].copyTarget;
//       }
//     }
//     let obj = {};
//     if(Array.isArray(target)){
//       obj = [];//处理target是数组的情况
//     }
//     copyed_objs.push({target:target,copyTarget:obj})
//     Object.keys(target).forEach(key=>{
//       if(obj[key]){ return;}
//       obj[key] = _deepCopy(target[key]);
//     });
//     return obj;
//   }
//   return _deepCopy(target);
// }
const target = {
  [Symbol(11)]: 2,
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};

target.target = target
function deepCopy(target, map = new Map()) {
  if(typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if(map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    Reflect.ownKeys(target).forEach((key) => {
      cloneTarget[key] = deepCopy(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}

console.log(deepCopy(target))

// Function.prototype.myBind = function (context, ...args) {
//   const fn = this
//   return function newFn(...args1) {
//     if(new.target) {
//       return new fn(...args, ...args1)
//     }
//     Function.prototype.apply.call(fn, context, [...args, ...args1])
//   }
// }
Function.prototype.myBind = function (context, ...outerArgs) {
  // this->func context->obj outerArgs->[10,20]
  let self = this
  // 返回一个函数
  return function F(...innerArgs) { //返回了一个函数，...innerArgs为实际调用时传入的参数
    // 考虑new的方式
    if(new.target) {
      console.log(this , self)
      return new self(...outerArgs, ...innerArgs)
    }
    // 把func执行，并且改变this即可
    return self.apply(context, [...outerArgs, ...innerArgs]) //返回改变了this的函数，参数合并
  }
}

var value = 2;
var foo = {
  value: 1
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'Jack');
var obj = new bindFoo(20);
// undefined
// Jack
// 20

obj.habit;
// shopping

obj.friend;
// kevin
console.log(obj.habit,obj.friend)
// function test(a, b) {
//   this.a = a
//   this.b = b
//   // console.log(this.a, this.b)
// }
//
// var foo = {}
// test.prototype.say = function () {
//   console.log(this.a)
// }
// const test1 = test.bind(foo ,1)
// // test1(2)
// const obj1 = new test1(2)
// console.log(obj1)
// obj1.say()
// const test2 = test.bind(null ,1)
// new test2(2)

const test2 = test.bind(null ,1)
new test2(2)

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.call(obj, ...args)
  return typeof result === 'object' ? result : obj
}

// 类的继承
function Parent(name) {
  this.parentName = name
}

function Son(name, parent) {
  Parent.call(this, name)
}

Son.prototype = Object.create(Parent.prototype)
Son.prototype.constructor = Son

Promise.resolve = (params) => {
  if(params instanceof Promise) return params
  return new Promise((res, rej) => {
    if(params && params.then && typeof params.then === 'function') {
      params.then(res, rej)
    } else {
      res(params)
    }
  })
}

Promise.prototype.finally = function(callback) {
  this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value;
    })
  }, error => {
    return Promise.resolve(callback()).then(() => {
      throw error;
    })
  })
}

function bubbleSort(list) {
  if(!list?.length) {
    return []
  }
  let len = list.length
  for(var i = 0;i < list.length; i++) {
    for (var j = 0;j < len - i;j++) {
      if(list[j] > list[j + 1]) {
       [list[j], list[j+1]] = [list[j + 1], list[j]]
      }
    }
  }
  return list
}

console.log(bubbleSort(null))
