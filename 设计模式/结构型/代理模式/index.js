/**
 * 代理模式是为一个对象提供一个代用品或站位符，以方便对他的控制
 * 举一个加载图片的例子
 */
// class MyImage {
//     constructor() {
//         this.img = new Image()
//         document.body.appendChild(this.img)
//     }
//     setSrc(src) {
//         this.img.src = src
//     }
// }

// class ProxyImage {
//     constructor() {
//         this.proxyImage = new Image()
//     }
//     setSrc(src) {
//         let myImage = new MyImage()
//         myImage.setSrc('本地路径')
//         this.proxyImage.src = src
//         this.proxyImage.onload = function() {
//             myImage.setSrc(src)
//         }
//     }
// }

// var proxyImage = new ProxyImage()
// proxyImage.setSrc('http://xxx.png') //服务器资源url

// 代理模式Proxy
let xiaohong = {
    name: "小红",
    age: 15
  };
  xiaohong = new Proxy(xiaohong, {
    get(target, key) {
      let result = target[key];
      //如果是获取 年龄 属性，则添加 岁字
      if (key === "age") result += "岁";
      return result;
    },
    set(target, key, value) {
      if (key === "age" && typeof value !== "number") {
        throw Error("age字段必须为Number类型");
      }
      target[key] = value;
      // return Reflect.set(target, key, value);
    }
  });
  console.log(`我叫${xiaohong.name}  我今年${xiaohong.age}了`);
  xiaohong.age = 11;
  console.log(`我叫${xiaohong.name}  我今年${xiaohong.age}了`);
