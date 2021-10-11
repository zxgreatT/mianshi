// // const promise1 = new Promise((resolve, reject) => {
// //   console.log('promise1')
// //   resolve('resolve1')
// // })
// // const promise2 = promise1.then(res => {
// //   console.log(res)
// // })
// // promise2.then(() => {
// //   console.log(11)
// // }).then(function () {
// //   console.log(2)
// // })
// // setTimeout(() => {
// //   console.log(promise2)
// // }, 0)
// // console.log('1', promise1);
// // console.log('2', promise2);
//
// // var p2 = new Promise(function(resolve, reject) {
// //   resolve(1);
// // });
// //
// // p2.then(function(value) {
// //   console.log(value); // 1
// //   return value + 1;
// // }).then(function(value) {
// //   console.log(value + ' - A synchronous value works');
// // });
// //
// // p2.then(function(value) {
// //   console.log(value); // 1
// // });
//
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// })
// const promise2 = promise1.then(() => {
//   throw new Error('error!!!')
// })
// console.log('promise1', promise1)
// console.log('promise2', promise2)
// setTimeout(() => {
//   console.log('promise1', promise1)
//   console.log('promise2', promise2)
// }, 2000)

// const first = () => (new Promise((resolve, reject) => {
//   console.log(3);
//   let p = new Promise((resolve, reject) => {
//     console.log(7);
//     setTimeout(() => {
//       console.log(5);
//       resolve(6);
//       console.log(p)
//     }, 0)
//     resolve(1);
//   });
//   resolve(2);
//   p.then((arg) => {
//     console.log(arg);
//   });
// }));
// first().then((arg) => {
//   console.log(arg);
// });
// console.log(4);

// const async1 = async () => {
//   console.log('async1');
//   setTimeout(() => {
//     console.log('timer1')
//   }, 2000)
//   await new Promise(resolve => {
//     console.log('promise1')
//   })
//   console.log('async1 end')
//   return 'async1 success'
// }
// console.log('script start');
// async1().then(res => console.log(res));
// console.log('script end');
// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .catch(4)
//   .then(res => console.log(res))
// setTimeout(() => {
//   console.log('timer2')
// }, 1000)

// console.log('script start')
//
// async function async1() {
//   console.log(1)
//   await 1
//   console.log(2)
//   console.log(await async2())
// }
//
// async function async2() {
//   console.log(3)
//   await 1
//   console.log(4)
//   return await 5
// }
//
// function append() {
//   return Promise.resolve(6)
// }
//
// async1()
//
// Promise.resolve(7).then(console.log).then(append).then(console.log)
//
// Promise.resolve(8).then(console.log)
//
// console.log('script end')

async function waitAndMaybeReject() {
  // 等待1秒
  await new Promise(r => setTimeout(r, 100));

  const isHeads = Boolean(Math.round(Math.random()));
  // throw Error('Boo!');
  if (isHeads) {
    return 'yay';
  } else {
    throw Error('Boo!');
  }
}

async function foo() {
  try {
    await waitAndMaybeReject();
  }
  catch (e) {
    console.log(e)
  }
}

foo()

new Map([[1,3]]).keys()
// 手写promise.all
Promise.all = function (iterator) {
  return new Promise((res, rej) => {
    let result = []
    let index = 0
    let len = iterator.length
    if(!len) {
      res(result)
      return
    }

    for(let i;i<len;i++) {
      Promise.resolve(iterator[i]).then((data) => {
        result[i] =data
        index++
        if(index = len) res(result)
      }).catch(err => {
        rej(err)
      })
    }
  })
}
