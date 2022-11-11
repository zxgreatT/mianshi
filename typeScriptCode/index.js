"use strict";
// 模式匹配做提取
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var test = function (a, b) {
    return a + b;
};
var IHttpMethods;
(function (IHttpMethods) {
    IHttpMethods["GET"] = "get";
    IHttpMethods["POST"] = "post";
    IHttpMethods["DELETE"] = "delete";
    IHttpMethods["PUT"] = "put";
})(IHttpMethods || (IHttpMethods = {}));
var methods = ["get", "post", "delete", "put"];
var httpMethods = methods.reduce(function (map, method) {
    map[method] = function (url, options) {
        if (options === void 0) { options = {}; }
        var data = options.data, config = __rest(options, ["data"]);
        return axios[method](url, data, config)
            .then(function (res) {
            if (res.data.errCode) {
                //todo somethins
            }
            else {
                //todo somethins
            }
        });
    };
    return map;
}, {});
console.log(3123);
