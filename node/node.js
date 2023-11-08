// // 测试用例
// /*
// 0
// 1
// 2
// 1.1
// 3
// */
// let middleware = []
// middleware.push((next) => {
// 	console.log(0)
// 	next()
// 	console.log(3)
// })
// middleware.push((next) => {
// 	console.log(1)
// 	next()
// 	console.log(1.1)
// })
// middleware.push(() => {
//     console.log(2)
// })

// // 基本的
// const compose = (queue) => {
//   return () => {
//     // const fn0 = queue[0]
//     // fn0(() => {
//     //   const fn1 = queue[1]
//     // })
//     const dispach = (i) => {
//       const fn = queue[i]
//       if (!fn) return null
//       fn(() => {
//         dispach(i+1)
//       })
//     }
//     dispach(0)
//   }
// }

// // 支持异步 允许传递参数
// const asuncCompose = (queue) => {
//   return async () => {
//     const args = arguments
//     const dispach = async (i) => {
//       const fn = queue[i]
//       if (!fn) return null
//       await fn(() => {
//         dispach(i+1)
//       }, {...args})
//     }
//     dispach(0)
//   }
// }

// let fn = compose(middleware)
// fn()
