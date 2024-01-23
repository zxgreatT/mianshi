var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function sortedSquares(nums) {
    var start = 0;
    var end = nums.length - 1;
    var arr = [];
    while (start <= end) {
        var temp1 = Math.pow(nums[start], 2);
        var temp2 = Math.pow(nums[end], 2);
        if (temp1 > temp2) {
            arr.unshift(temp1);
            start++;
        }
        else {
            arr.unshift(temp2);
            end--;
        }
    }
    return arr;
}
// const a = sortedSquares([-1,0,3])
function minSubArrayLen(target, nums) {
    var sum = nums[0];
    var start = 0;
    var end = 1;
    var flag = Infinity;
    while (end < nums.length) {
        if (target === sum) {
            if (flag > (end - start + 1)) {
                flag = end - start + 1;
            }
        }
        if (sum < target) {
            sum += nums[end++];
        }
        else {
            sum -= nums[start++];
            if (flag > (end - start + 1)) {
                flag = (end - start + 1);
            }
        }
    }
    return flag === Infinity ? 0 : flag;
}
// minSubArrayLen(11,[1,1,1,1,1,1,1,1])
function isAnagram(s, t) {
    if (s.length !== t.length)
        return false;
    var map = new Map();
    for (var i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            // @ts-ignore
            var num = map.get(s[i]) + 1;
            map.set(s[i], num);
        }
        else {
            map.set(s[i], 1);
        }
    }
    for (var i = 0; i < t.length; i++) {
        if (map.has(t[i])) {
            // @ts-ignore
            var num = map.get(t[i]) - 1;
            map.set(t[i], num);
            // @ts-ignore
            if (map.get(t[i]) < 0) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return true;
}
;
//leetcode submit region end(Prohibit modification and deletion)
// const test = isAnagram('abs', 'sab')
// console.log(test)
function commonChars(words) {
    if (words.length === 0)
        return [];
    var map = new Map();
    for (var i = 0; i < words[0].length; i++) {
        var char = words[0][i];
        map.set(char, (map.get(char) || 0) + 1);
    }
    for (var i = 1; i < words.length; i++) {
        var map2 = new Map();
        for (var j = 0; j < words[i].length; j++) {
            var char = words[i][j];
            map2.set(char, (map2.get(char) || 0) + 1);
        }
        for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
            var _a = map_1[_i], key = _a[0], value = _a[1];
            if (map2.has(key)) {
                map.set(key, Math.min(value, map2.get(key)));
            }
            else {
                map.set(key, 0);
            }
        }
    }
    var temp = __spreadArray([], map.keys(), true).reduce(function (acc, cur) {
        if (map.get(cur) === 1) {
            return __spreadArray(__spreadArray([], acc, true), [cur], false);
        }
        else if (map.get(cur) > 1) {
            return __spreadArray(__spreadArray([], acc, true), new Array(map.get(cur)).fill(cur), true);
        }
        else
            return acc;
    }, []);
    return temp;
}
// commonChars(["bella","label","roller"])
function threeSum(nums) {
    if (nums.length < 3)
        return [];
    var sortArr = nums.sort(function (a, b) { return a - b; });
    var result = [];
    var start = 0;
    var end = sortArr.length - 1;
    while (start <= end) {
        var sum = sortArr[start] + sortArr[end];
        if (sum <= 0) {
            for (var i = end - 1; i > start; i--) {
                if (sortArr[i] + sum < 0)
                    break;
                if (sortArr[i] + sum === 0) {
                    result.push([sortArr[start], sortArr[i], sortArr[end]]);
                    break;
                }
            }
            if (sortArr[start] !== sortArr[start + 1]) {
                start++;
            }
            else {
                while (start < end && sortArr[start] === sortArr[start + 1]) {
                    start = start + 2;
                }
            }
        }
        else {
            for (var i = start + 1; i < end; i++) {
                if (sortArr[i] + sum > 0)
                    break;
                if (sortArr[i] + sum === 0) {
                    result.push([sortArr[start], sortArr[i], sortArr[end]]);
                    break;
                }
            }
            if (sortArr[end] !== sortArr[end - 1]) {
                end--;
            }
            else {
                while (start < end && sortArr[end] === sortArr[end - 1]) {
                    end = end - 2;
                }
            }
        }
    }
    return result;
}
;
console.log(threeSum([0, 0, 0, 0]));
