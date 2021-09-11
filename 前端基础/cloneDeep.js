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

const obj = {
  a: 1
}

Object.assign(obj, {
  a: 2,
  b: 1
})