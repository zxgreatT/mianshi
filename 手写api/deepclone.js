"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var objTsst = {
    a: 1,
    arr: [1, 2, [2, 3], { a: 123 }],
    set: new Set([1, 2, 3, 4, { a: 1 }]),
    map: new Map([[1, 2]]),
    num: new Number(123),
    str: new String('12222'),
    date: new Date(),
    err: new Error('错误'),
    symbol: Symbol(),
    reg: /(?<={)(.|\n)+(?=})/m,
    func: function () {
        console.log(111);
    }
};
objTsst.map.set(1234, { a: 1111 });
objTsst.target = objTsst;
var isObject = function (target) { return (typeof target === 'object' && typeof target !== null); };
var getType = function (obj) { return Object.prototype.toString.call(obj); };
// 基础解决循环引用版本
// function deepClone(target: any, map = new Map()) {
//     if(map.has(target)) {
//         return target
//     }
//
//     if(isObject(target)) {
//         map.set(target, true)
//         const cloneTarget: any = Array.isArray(target) ? [] : {}
//         Reflect.ownKeys(target).forEach((item) => {
//             cloneTarget[item] = deepClone(target[item], map)
//         })
//         return cloneTarget
//     } else {
//         return target
//     }
//
// }
var a = {
    a: 1,
    length: 1
};
var mapTag = '[object Map]';
var setTag = '[object Set]';
var arrayTag = '[object Array]';
var objectTag = '[object Object]';
var argsTag = '[object Arguments]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var numberTag = '[object Number]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';
var errorTag = '[object Error]';
var regexpTag = '[object RegExp]';
var funcTag = '[object Function]';
var deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];
var handleRegExp = function (target) {
    var source = target.source, flags = target.flags;
    return new target.constructor(source, flags);
};
var handleFunc = function (func) {
    // 箭头函数直接返回自身
    if (!func.prototype)
        return func;
    var bodyReg = /(?<={)(.|\n)+(?=})/m;
    var paramReg = /(?<=\().+(?=\)\s+{)/;
    var funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    var param = paramReg.exec(funcString);
    var body = bodyReg.exec(funcString);
    if (!body)
        return null;
    if (param) {
        var paramArr = param[0].split(',');
        return new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], paramArr, false), [body[0]], false)))();
    }
    else {
        return new Function(body[0]);
    }
};
var arr = [1, 2.3];
function deepClone(target, map) {
    if (map === void 0) { map = new Map(); }
    if (map.has(target)) {
        return target;
    }
    if (isObject(target)) {
        map.set(target, true);
        var cloneTarget_1 = null;
        // 可便利的对象
        var type = getType(target);
        if (deepTag.includes(type)) {
            cloneTarget_1 = new target.constructor();
            // console.log(cloneTarget)
            switch (type) {
                case mapTag:
                    target.forEach(function (val, key) {
                        cloneTarget_1.set(deepClone(key, map), deepClone(val, map));
                    });
                    break;
                case setTag:
                    target.forEach(function (item) {
                        cloneTarget_1.add(deepClone(item, map));
                    });
                    break;
                case arrayTag:
                case objectTag:
                case argsTag:
                    Reflect.ownKeys(target).forEach(function (item) {
                        cloneTarget_1[item] = deepClone(target[item], map);
                    });
                    break;
            }
        }
        else {
            var ctor = target.constructor;
            switch (type) {
                case boolTag:
                case numberTag:
                case stringTag:
                case errorTag:
                case dateTag:
                case errorTag:
                    return new ctor(target);
                case regexpTag:
                    return handleRegExp(target);
                case funcTag:
                    return handleFunc(target);
            }
        }
        return cloneTarget_1;
    }
    else {
        return target;
    }
}
console.log(deepClone(objTsst));
