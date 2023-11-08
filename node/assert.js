/*
 * @Description: 
 * @Author: 涧牛
 * @Date: 2023-05-05 11:59:02
 * @LastEditTime: 2023-05-05 13:50:08
 * @LastEditors: 涧牛
 */
const assert = require('node:assert/strict');

// assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);

assert.deepEqual(/a/gi, new Date());