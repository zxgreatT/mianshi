"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = new Map([[1, 2]]);
console.log(a);
var b = {
    a: 1,
    b: 2
};
Object.getOwnPropertyNames(b);
var Sex;
(function (Sex) {
    Sex[Sex["Man"] = 0] = "Man";
    Sex[Sex["Woman"] = 1] = "Woman";
    Sex[Sex["UnKnow"] = 2] = "UnKnow";
})(Sex || (Sex = {}));
var abc = { name: 'q' };
console.log(123123123123123);
var castArray = function (value) { return (Array.isArray(value) ? value : [value]); };
console.log(castArray(1));
castArray(1); // [1]
castArray([1, 2, 3]); // [1, 2, 3]
console.log(123123);
console.log('merges');
