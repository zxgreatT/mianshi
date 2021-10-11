Promise.resolve(1).then(console.log)
console.log(2)


var a = async (arr) => {
  return await arr.reduce((p, n) => {
    return p.then(id => {
      console.log(id, `a`)
      return n
    })
  })
}

var c = (time, id) => {
  return new Promise(res => {
    setTimeout(() => {
      console.log(id, `b`)
      res(id)
    }, time);
  })
}

var r = a([
  c(1000, 1),
  c(3000, 2),
  c(5000, 3),
])

r.then(id => {
  console.log(id, `r`)
})
