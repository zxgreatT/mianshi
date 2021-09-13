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
let obj = {
  reg : /^asd$/,
  fun: function(){},
  syb:Symbol('foo'),
  asd:'asd'
};
let cp = JSON.parse(JSON.stringify(obj));
// console.log(cp);


function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function cloneDeep(target) {
  if(!isObject(target)) {
    return target
  }
  let result = Array.isArray(target) ? [] : {}
  const keys = Object.keys(target)
  for(let i = 0;i < keys.length;i++) {
    result[keys[i]] = cloneDeep(target[keys[i]])
  }
  return  result
}

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

// console.log(deepCopy(target))

Function.prototype.myBind = function (context, ...args) {
  const fn = this
  return function newFn(...args1) {
    console.log(newFn)
    console.log(this === newFn, 1)
    console.log(this, Object.prototype.toString.call(this))
    if(new.target) {
      return new fn(...args, ...args1)
    }
    Function.prototype.apply.call(fn, context, [...args, ...args1])
  }
}

function test(a, b) {
  console.log(a, b)
}
const test1 = test.myBind(null ,1)
// test1(2)
const obj1 = new test1(2)

const test2 = test.bind(null ,1)
new test2(2)