// 柯里化就是函数的特殊用法
// 普通函数
function add(a, b) {
    return a + b
}
// 柯里化
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

// 手动封装bind
// 1 改变原函数的this的指向，及绑定上下文，返回原函数的拷贝
// 2 当绑定函数被调用时，bind的额外参数将置于实参之前传递给被绑定的函数
// 3 注意 一个绑定函数也能使用new操作符创建对象，这种行为就像把原函数当成构造器，
// 输入：接受一个或者多个参数，第一个是要绑定的上下文，额外参数当作绑定函数的前置参数。绑定的this无效new大于显示绑定
// 输出：返回原函数的拷贝，即返回一个函数，这个函数呢具备原函数的功能

Function.prototype.myBind = function (thisArg) {
    if (typeof this !== 'function') {
        return
    }
    const _self = this
    const args = Array.prototype.slice.call(arguments, 1)
    return function () {
        return _self.apply(thisArg, [...args, ...Array.prototype.slice.call(arguments)])
    }
}

function foo(name, age) {
    // console.log(this.name)
    this.name = name
    this.age = age
    // console.log(this.name, this.age)
}

const obj = {
    name: 'hah'
}

Function.prototype.newBind = function (thisArg) {
    if (typeof this !== 'function') {
        return;
    }
    var _self = this;
    var args = Array.prototype.slice.call(arguments, 1)
    var fnBound = function () {
        // 检测 New
        // 如果当前函数的this指向的是构造函数中的this 则判定为new 操作
        var _this = this instanceof _self ? this : thisArg;
        return _self.apply(_this, args.concat(Array.prototype.slice.call(arguments)));
    }
    // 为了完成 new操作
    // 还需要做一件事情 执行原型 链接 （思考题，为什么？
    fnBound.prototype = this.prototype;
    return fnBound;
}

const test = foo.myBind(obj, 'name')
// test(12)
// console.log(obj)
const test1 = new test('tian')
// console.log(test1, obj)

var inherit = (function () {
    //创建圣杯inherit函数
    /* 使用立即函数的原因：函数执行前会进行预编译，预编译过程都会产生AO，
    如当前案例所示，案例中的立即执行函数(注：以下简称立函)执行前预编译的AO中有buffer函数，
    由于当立函执行完毕时会返回一个匿名函数(注：以下简称匿函)，这个匿函调用了buffer函数，
    最终匿函也被赋予到了inherit函数中，导致立函执行前预编译产生的AO在立函执行完毕后并不会销毁，
    于是buffer函数成为了一个闭包并被一同赋予到了inherit函数中去了，
    这样当在外部使用inherit函数时，将会一直都在使用一个buffer函数，
    而不用每次使用时都再新建一个buffer函数 */
    return function (targetSon, originFather) { //让目标儿子继承源头父亲
        function buffer() { } //buffer函数是一个闭包，仅用做一个缓冲而不做他用
        buffer.prototype = originFather.prototype;
        //targetSon.prototype = buffer.prototype; /* 不能这么写，因为这样写就相当于对象targetSon、fatherOrigin和buffer共享原型了 */
        targetSon.prototype = new buffer(); /* 使对象targetSon试图修改自身属性时仅仅是以buffer函数作为对象进行修改，而不会影响到其他对象 */
        targetSon.prototype.constructor = targetSon; //令目标儿子记得自己本质是谁
        targetSon.prototype.gene = originFather; //令目标儿子记得自己的生父是谁
    }
})()

Function.prototype.myCall = function (context, ...arr) {
    if (context === null || context === undefined) {
        // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
        context = window
    } else {
        context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
    }
    const specialPrototype = Symbol('特殊属性Symbol') // 用于临时储存函数
    console.log(this)
    context[specialPrototype] = this; // 函数的this指向隐式绑定到context上
    let result = context[specialPrototype](...arr); // 通过隐式绑定执行函数并传递参数
    delete context[specialPrototype]; // 删除上下文对象的属性
    return result; // 返回函数执行结果
}

function test2() {
    console.log(this.name)
}

test2.myCall(obj)

// 手写new
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function () {
        // console.log(this.name)
    }
}
Person.prototype.sex = '男'
var p1 = new Person('jie', 12)
// p1.say()

function create() {
    let obj = new Object();
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype;
    let ret = Con.apply(obj, arguments)
    return ret instanceof Object ? ret : obj
}
var p2 = create(Person, 'biao', 22)
// p2.say()

// 手写实现map
Array.prototype._map = function (fn, thisValue) {
    let arr = thisValue || this
    let result = []
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    for (let i = 0; i < arr.length; i++) {
        let r = fn.call(arr, arr[i], i, arr)
        result.push(r)
    }
    return result
}

let arr = [4, 9, 16, 25];
let result = arr._map((item) => {
    return item * 2
})

// 字符串的倒序
var reverseString = function (s) {
    var start = 0, end = s.length - 1;
    // 先转化为数组再进行反转
    var ret = s.split('');

    while (start < end) {
        var tmp = ret[start];
        ret[start++] = ret[end];
        ret[end--] = tmp;
    }

    return ret.join('')
}

Array.prototype.newMap = function (func, thisArg) {
    return this.reduce((accumulator, currentValue, currentIndex, array) => {
        accumulator.push(func.bind(thisArg)(currentValue, currentIndex, array))
        return accumulator
    }, [])
}

var lengthOfLongestSubstring = function (s) {
    const len = s.length;
    if (!len) {
        return 0;
    }

    let str = '';
    let result = 0;
    for (let i = 0; i < len; i++) {
        const index = str.indexOf(s[i]);
        if (index === -1) {
            str += s[i];
        } else {
            str = str.substring(index + 1) + s[i];

        }
        // console.log(str)
        result = Math.max(result, str.length);
    }

    return result;
}

lengthOfLongestSubstring('aabcc')


// 防抖
function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
    }
}

// 节流
function throttle(fn, delay) {
    let flag = true
    return function () {
        if (!flag) {
            return
        }
        flag = false
        setTimeout(() => {
            fn()
            flag = true
        }, delay);
    }
}

//对象深拷贝
function deepClone(origin, target) {
    //target是否存在如果不存在创建空对象
    let tar = target || {},
        //判断是否为引用数据类型
        toStr = Object.prototype.toString,
        arrType = '[object Array]';

    for (let key in origin) {
        //剥离原型链的数据
        if (origin.hasOwnProperty(key)) {
            //判断是否为引用数据类型 对象或数组
            if (typeof (origin[key]) === 'object' && origin[key] !== null) {
                if (toStr.call(origin[key]) === arrType) {
                    tar[key] = [];
                } else {
                    tar[key] = {};
                }
                deepClone(origin[key], tar[key]);
            } else {
                tar[key] = origin[key];
            }
        }
    }
    return tar;
}
// 事件委托
window.onload = function () {
    var oUl = document.getElementById("ul1");
    oUl.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'li') {
            alert(123);
            alert(target.innerHTML);
        }
    }
}

// ecamscript
function FunctionIsConstructor(fnc) {
    let isConstructor = true;
    try {
        Object instanceof fnc
    } catch (e) {
        if (e instanceof TypeError) {
            isConstructor = false
        }
    }
    return isConstructor
}
function BoundFunctionCreate(targetFunction, boundThis, boundArgs) {
    let proto = Object.getPrototypeOf(targetFunction);
    let boundFunction = function () {
        if (new.target) {
            // 实现构造函数功能
            if (FunctionIsConstructor(targetFunction)) {
                return new targetFunction(...boundArgs)
            } else {
                throw new TypeError(`${arguments.callee.name} is not a constructor`)
            }
        } else {
            // 实现函数调用功能
            return targetFunction.call(boundThis, [...boundArgs, ...arguments])
        }
    }
    delete boundFunction.name;
    Object.setPrototypeOf(boundFunction, proto)
    return boundFunction;
}
function isCallable(Target) {
    if (typeof Target === 'function') return true;
    return false;
}
function ToInteger(arg) {
    let number = Number(arg);
    if (number !== number) return +0;
    if (number === 0 || number === Infinity || number === -Infinity) return number;
    return Math.floor(Math.abs(number));
}
function SetFunctionName(F, name, prefix) {
    if (typeof name === 'symbol') {
        let description = name.description
        if (description === undefined) {
            name = ''
        } else {
            name = `[${description}]`
        }
    }
    if (prefix) {
        name = `${prefix} ${name}`
    }
    return Object.defineProperty(F, 'name', {
        value: name,
        writable: false,
        enumerable: false,
        configurable: true
    })
}
function SetFunctionLength(F, Target, args) {
    let targetHasLength = Target.hasOwnProperty('length');
    let L;
    if (targetHasLength) {
        let targetLen = Target.length;
        if (typeof targetLen !== 'number') {
            L = 0;
        } else {
            targetLen = ToInteger(targetLen)
            L = Math.max(0, targetLen - args.length)
        }
    } else {
        L = 0;
    }
    Object.defineProperty(F, 'length', {
        value: L,
        writable: false,
        enumerable: false,
        configurable: true
    })
}

console.log('test123')
