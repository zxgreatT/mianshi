浏览器的内核是多进程  
* brower进程
  * 主进程负责和页面展示与用户交互，如前进后退
  * 页面的前进，后退
  * 负责页面的管理，创建和销毁其他的进程
* cpu进程
  * 3d加速 
   > 浏览器采用硬件加速，关键在于创建新的复合图层translate属性opactiy，z-index
* 插件进程
  * 每个插件对应的进程
* 浏览器渲染进程
  * gpu渲染进程
    * dom解析，css解析，生成渲染树
  * js引擎线程
    * 执行js代码
  * 事件任务队列
  * 异步Http请求线程
  * 定时器触发线程
  js引擎线程和gui渲染进程是互斥的关系，防止ui线程修改dom展示不一致的问题
  js执行过唱就会阻塞页面的渲染
  
线程和进程的关系
 * 进程是cpu资源分配的最小单位
 * 线程是cpu调度的最小单位(是建立在进程基础上的程序运行单位)
 * 一个进程至少有一个线程，这些线程会共享进程的内存空间
任务队列的概念，当js引擎正在执行任务，那马任务就要放在一个队列里面进行等待，等到线程空闲的时候应用先进先出的规则进行执行
 
setimeout 当执行该语句的时候，把语句推入的是事件队列，等事件条件达到满足的时候在推入任务队列，如果当时的任务队列部位空，则需要等待，所以定时器的执行是不准确的
[掘金](https://juejin.cn/post/6844904083204079630#heading-15)
requestAnimationFrame是浏览器定时任务操作的多接口，类似于setimeout主要用途是按帧对网页进行重绘，这个api的基本思想是保持和浏览器的刷新率同步，这个在主线程进行如果主线程繁忙
效率会大打折扣，这个api会在浏览器重绘之前调用

##js 模块化的概念
将js按照职责的不同分割成不同的js，用来解决全局变量污染、变量冲突、命名问题、依赖关系、代码解耦js代码难以维护的一种js管理思想，这就是模块化过程

### 模块化的发展历史
从最初的无模块话，发展到闭包式的IIFE立即执行解决模块化，commonJs(同步)、AMD、CMD到后来的es6Moudle

AMD、CMD、CommonJS 与 ES6 模块化的区别？
CommonJS是nodejs的一种模块同步加载规范，一个文件即是一个模块，使用的时候直接require但是不适用于客户端，因为客户端的文件不再本地需要请求会阻断后面的js，加载完毕后才能调用模块，服务器没有影响

