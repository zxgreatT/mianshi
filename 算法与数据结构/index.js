// // 创建图
// function Craph() {
// 	var
// }
//
//
function App(a) {
  this.a = a
}
App.prototype.say = function () {
  console.log(this.a)
  return this.a
}

new App('1').say()
new App('2').say()