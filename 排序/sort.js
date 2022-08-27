"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var SORT = /** @class */ (function () {
    function SORT() {
        this.array = Array.prototype;
    }
    SORT.SWAP = function (array, i, j, temp) {
        if (temp === void 0) { temp = array[j]; }
        array[j] = array[i];
        array[i] = temp;
        return array;
    };
    SORT.subtraction = function (a, b) {
        return a - b;
    };
    SORT.prototype.RESET = function () {
        this.array = [4, 4, 6, 5, 3, 2, 8, 1];
        return this;
    };
    /** 冒泡排序 */
    SORT.prototype.BUBBLE = function () {
        var array = this.array;
        var i = 0;
        var j = 0;
        for (i = 0; i < array.length; i++) {
            for (j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1])
                    SORT.SWAP(array, j, j + 1);
            }
        }
        return array;
    };
    /** 选择排序 */
    SORT.prototype.SELECT = function () {
        var array = this.array;
        var i = 0;
        var j = 0;
        var minIndex = 0;
        for (i = 0; i < array.length - 1; i++) {
            minIndex = i; // 先假设每次循环时，最小数的索引为i
            // 每一个元素都和剩下的未排序的元素比较
            for (j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIndex])
                    minIndex = j; // 将最小数的索引保存
            }
            // 经过一轮循环，就可以找出第一个最小值的索引，然后把最小值放到i的位置
            SORT.SWAP(array, i, minIndex);
        }
        return array;
    };
    /** 插入排序 */
    SORT.prototype.INSERT = function () {
        var array = this.array;
        var i = 1;
        var j = 0;
        for (i = 1; i < array.length; i++) {
            for (j = i; j; j--) {
                if (array[j] < array[j - 1])
                    SORT.SWAP(array, j, j - 1);
            }
        }
        return array;
    };
    /** 希尔排序 */
    SORT.prototype.SHELL = function () {
        var array = this.array;
        var fraction = 0;
        var i = 0;
        var j = 0;
        for (fraction = (array.length / 2) | 0; fraction; fraction = (fraction / 2) | 0) {
            for (i = fraction; i < array.length; i++) {
                for (j = i - fraction; j >= 0; j -= fraction) {
                    if (array[j] > array[fraction + j]) {
                        SORT.SWAP(array, j, fraction + j);
                    }
                }
            }
        }
        return array;
    };
    /** 归并排序 */
    SORT.prototype.MERGE = function () {
        return SORT.MERGE(this.array);
    };
    SORT.MERGE = function (array) {
        if (array.length < 2)
            return array;
        var mid = (array.length / 2) | 0;
        return SORT.MERGE_ARRAY(SORT.MERGE(array.slice(0, mid)), SORT.MERGE(array.slice(mid)));
    };
    SORT.MERGE_ARRAY = function (array1, array2) {
        var array = Array(array1.length + array2.length);
        var i = 0;
        var j = 0;
        var k = 0;
        while (i < array1.length && j < array2.length)
            array[k++] = array1[i] < array2[j] ? array1[i++] : array2[j++];
        while (i < array1.length)
            array[k++] = array1[i++];
        while (j < array2.length)
            array[k++] = array2[j++];
        return array;
    };
    /** 快速排序 */
    SORT.prototype.QUICK = function () {
        return SORT.QUICK(this.array, 0, this.array.length - 1);
    };
    SORT.QUICK = function (array, low, high) {
        if (high <= low)
            return array;
        var i = low;
        var j = high + 1;
        var key = array[low];
        while (true) {
            while (array[++i] < key)
                if (i === high)
                    break; // 从左向右找比key大的值
            while (array[--j] > key)
                if (j === low)
                    break; // 从右向左找比key小的值
            if (i >= j)
                break;
            SORT.SWAP(array, i, j);
        }
        SORT.SWAP(array, low, j); // 中枢值与j对应值交换
        SORT.QUICK(array, low, j - 1);
        SORT.QUICK(array, j + 1, high);
        return array;
    };
    /** 桶排序 */
    SORT.prototype.BUCKET = function () {
        var array = this.array;
        var bucket = Array.from({ length: 10 }, SORT.INIT_ARRAY, array);
        var digits = BigInt(Math.max.apply(null, array)).toString().length;
        for (var i = 1; i <= digits; i++) {
            SORT.distributeElements(array, bucket, i);
            SORT.collectElements(array, bucket);
            i === digits || bucket.forEach(SORT.FILL_ZERO);
        }
        return array;
    };
    SORT.distributeElements = function (array, bucket, digits) {
        /** 除数 */
        var divisor = Math.pow(10, digits);
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var cur = array_1[_i];
            var numOfDigit = (((cur % divisor) - (cur % (divisor / 10))) / (divisor / 10)) | 0;
            //numOfDigits为相应的(divisor/10)位的值,如当divisor=10时,求的是个位数
            var num = ++bucket[numOfDigit][0]; //用b中第一列的元素来储存每行中元素的个数
            bucket[numOfDigit][num] = cur;
        }
    };
    SORT.collectElements = function (array, bucket) {
        var k = 0;
        for (var i = 0; i < 10; i++)
            for (var j = 1; j <= bucket[i][0]; j++)
                array[k++] = bucket[i][j];
    };
    SORT.INIT_ARRAY = function () {
        return Array(this.length).fill(0);
    };
    SORT.FILL_ZERO = function (array) {
        return array.fill(0);
    };
    /**
     * 计数排序对输入的数据有附加的限制条件：
     * * 输入的线性表的元素属于有限偏序集S；
     * * 设输入的线性表的长度为n，|S|=k（表示集合S中元素的总数目为k），则k=O(n)。
     *
     * 在这两个条件下，计数排序的复杂性为O(n)。
     * @description
     * 计数排序的基本思想是对于给定的输入序列中的每一个元素x，确定该序列中值小于x的元素的个数（此处并非比较各元素的大小，而是通过对元素值的计数和计数值的累加来确定）。
     * 一旦有了这个信息，就可以将x直接存放到最终的输出序列的正确位置上。
     * 例如，如果输入序列中只有17个元素的值小于x的值，则x可以直接存放在输出序列的第18个位置上。
     * 当然，如果有多个元素具有相同的值时，我们不能将这些元素放在输出序列的同一个位置上，因此，上述方案还要作适当的修改。
     *
     * 假设输入的线性表L的长度为n，L=L1,L2,..,Ln；线性表的元素属于有限偏序集S，|S|=k且k=O(n)，S={S1,S2,..Sk}；则计数排序可以描述如下：
     * * 扫描整个集合S，对每一个Si∈S，找到在线性表L中小于等于Si的元素的个数T(Si)；
     * * 扫描整个线性表L，对L中的每一个元素Li，将Li放在输出线性表的第T(Li)个位置上，并将T(Li)减1。
     */
    SORT.prototype.COUNTING = function () {
        var array = this.array;
        /**
         * 计数器
         * key为元素，value为计数值
         */
        var counter = new Map();
        var entry = null;
        for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
            entry = array_2[_i];
            counter.set(entry, (counter.get(entry) || 0) + 1);
        }
        var ranked = Array(array.length);
        var index = 0;
        // Map.prototype.keys为插入顺序，需要先进行一次key升序
        for (var _a = 0, _b = __spreadArrays(counter.keys()).sort(SORT.subtraction); _a < _b.length; _a++) {
            entry = _b[_a];
            while (counter.get(entry)) {
                ranked[index++] = entry;
                counter.set(entry, counter.get(entry) - 1);
            }
        }
        return ranked;
    };
    /**
     * 基数排序
     * @description
     * * Ω(n log(n))
     */
    SORT.prototype.RADIX = function () {
        var array = this.array;
        /** 获取数组中最高位数 */
        var bit = BigInt(Math.max.apply(null, array)).toString().length;
        var temp = Array(array.length);
        /** 位数计数器 */
        var counter = Array(10);
        var i = 0;
        var j = 0;
        /** 基数指数 */
        var k = 0;
        /** 基数 */
        var radix = 1;
        // 进行最高位数次排序
        for (i = 1; i <= bit; i++) {
            counter.fill(0); // 置空计数器
            // 统计基数指数
            for (j = 0; j < array.length; j++) {
                k = (array[j] / radix) % 10 | 0;
                counter[k]++;
            }
            for (j = 1; j < 10; j++)
                counter[j] = counter[j - 1] + counter[j]; // 将temp中的位置依次分配给每个桶
            for (j = array.length - 1; ~j; j--) {
                // 将所有桶中记录依次收集到tmp中
                k = (array[j] / radix) % 10 | 0;
                temp[counter[k] - 1] = array[j];
                counter[k]--;
            }
            for (j = 0; j < array.length; j++)
                array[j] = temp[j]; // 将临时数组的内容复制到array中
            radix *= 10; // 一轮循环自乘10
        }
        return array;
    };
    /**
     * 堆排序
     * @description
     * Ω(n log(n))
     * @returns
     */
    SORT.prototype.HEAP = function () {
        var array = this.array;
        // 初始化，i从最後一个父节点开始调整
        for (var i = (array.length / 2 - 1) | 0; ~i; i--)
            SORT.MAX_HEAP(array, i, array.length - 1);
        // 先将第一个元素和已经排好的元素前一位做交换，再从新调整(刚调整的元素之前的元素)，直到排序完毕
        for (var i = array.length - 1; i; i--) {
            SORT.SWAP(array, 0, i);
            SORT.MAX_HEAP(array, 0, i - 1);
        }
        return array;
    };
    SORT.MAX_HEAP = function (array, start, end) {
        var parentIndex = start;
        var childIndex = parentIndex * 2 + 1;
        while (childIndex <= end) {
            // 右子节点存在，且，右子节点大于左子节点，移动子节点为右子节点，取较大的子节点
            if (childIndex + 1 <= end && array[childIndex] < array[childIndex + 1])
                childIndex++;
            // 如果父节点大于子节点，直接返回
            if (array[parentIndex] > array[childIndex])
                return;
            // 交换父子节点
            SORT.SWAP(array, parentIndex, childIndex);
            // 向下扫描，移动指针
            parentIndex = childIndex;
            childIndex = parentIndex * 2 + 1;
        }
    };
    SORT.RESULT = String([1, 2, 3, 4, 4, 5, 6, 8]);
    return SORT;
}());
var Method = ['BUBBLE', 'SELECT', 'INSERT', 'SHELL', 'MERGE', 'QUICK', 'BUCKET', 'COUNTING', 'RADIX', 'HEAP'];
function test() {
    var sort = new SORT();
    for (var _i = 0, Method_1 = Method; _i < Method_1.length; _i++) {
        var method = Method_1[_i];
        console.log(method, sort.RESET()[method]().toString() === SORT.RESULT);
    }
}
test();
