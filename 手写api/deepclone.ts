const objTsst: any = {
    a:1,
    arr: [1,2,[2,3],{a: 123}],
    set: new Set([1,2,3,4, {a: 1}]),
    map: new Map([[1,2]]),
    num: new Number(123),
    str: new String('12222'),
    date: new Date(),
    err: new Error('错误'),
    symbol: Symbol(),
    reg: /(?<={)(.|\n)+(?=})/m,
    func: function () {
        console.log(111)
    }
}

objTsst.map.set(1234, {a: 1111})
objTsst.target = objTsst
const isObject = (target: any) => (typeof target === 'object' && typeof target !== null)
const getType = (obj: any) => Object.prototype.toString.call(obj)
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


const a = {
    a: 1,
    length: 1
}

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]
const handleRegExp = (target: any) => {
    const { source, flags } = target;
    return new target.constructor(source, flags);
}

const handleFunc = (func: Function) => {
    // 箭头函数直接返回自身
    if(!func.prototype) return func;
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if(!body) return null;
    if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
    } else {
        return new Function(body[0]);
    }
}
const arr = [1,2.3]
function deepClone(target: any, map = new Map()) {
    if(map.has(target)) {
        return target
    }

    if(isObject(target)) {
        map.set(target, true)
        let cloneTarget: any = null
        // 可便利的对象
        const type = getType(target)
        if(deepTag.includes(type)) {
            cloneTarget = new target.constructor()
            // console.log(cloneTarget)
            switch (type) {
                case mapTag:
                 target.forEach((val: any, key: any) => {
                     cloneTarget.set(deepClone(key, map), deepClone(val, map))
                 })
                    break
                case setTag:
                 target.forEach((item: any) => {
                     cloneTarget.add(deepClone(item, map))
                 })
                    break
                case arrayTag:
                case objectTag:
                case argsTag:
                    Reflect.ownKeys(target).forEach((item) => {
                        cloneTarget[item] = deepClone(target[item], map)
                    })
                    break
            }
        } else {
            const ctor = target.constructor
            switch (type) {
                case boolTag:
                case numberTag:
                case stringTag:
                case errorTag:
                case dateTag:
                case errorTag:
                    return  new ctor(target)
                case regexpTag:
                    return handleRegExp(target)
                case funcTag:
                    return  handleFunc(target)
            }
        }
        return cloneTarget
    } else {
        return target
    }

}
console.log(deepClone(objTsst))
