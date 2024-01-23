function sortedSquares(nums: number[]): number[] {
  let start = 0;
  let end = nums.length - 1;
  const arr: number[] = [];
  while (start <= end) {
    const temp1 = Math.pow(nums[start], 2);
    const temp2 = Math.pow(nums[end], 2);
    if (temp1 > temp2) {
      arr.unshift(temp1);
      start++;
    } else {
      arr.unshift(temp2);
      end--;
    }
  }
  return arr;
}
// const a = sortedSquares([-1,0,3])
function minSubArrayLen(target: number, nums: number[]): number {
  let sum = nums[0]
  let start = 0
  let end = 1
  let flag = Infinity
  while (end < nums.length) {
    if(target === sum) {
      if(flag > (end - start + 1)) {
        flag = end - start + 1
      }
    }
    if(sum < target) {
      sum += nums[end++]
    } else {
      sum -= nums[start++]
      if(flag > (end - start + 1)) {
        flag = (end - start + 1)
      }
    }
  }
  return flag === Infinity ? 0 : flag
}
// minSubArrayLen(11,[1,1,1,1,1,1,1,1])
function isAnagram(s: string, t: string): boolean {
  if(s.length !== t.length) return false
  const  map = new Map()
  for (let i = 0; i < s.length; i++) {
    if(map.has(s[i])) {
      // @ts-ignore
      const num = map.get(s[i]) + 1
      map.set(s[i], num)
    } else {
      map.set(s[i], 1)
    }
  }
  for (let i= 0; i < t.length; i++) {
    if(map.has(t[i])) {
      // @ts-ignore
      const num = map.get(t[i]) - 1
      map.set(t[i], num)
      // @ts-ignore
      if(map.get(t[i]) < 0) {
        return false
      }
    } else {
      return false
    }
  }
  return true
};
//leetcode submit region end(Prohibit modification and deletion)

// const test = isAnagram('abs', 'sab')
// console.log(test)

function commonChars(words: string[]): string[] {
  if (words.length === 0) return []
  const map = new Map();
  for (let i = 0; i < words[0].length; i++) {
    const char = words[0][i];
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (let i = 1; i < words.length; i++) {
    const map2 = new Map();
    for (let j = 0; j < words[i].length; j++) {
      const char = words[i][j];
      map2.set(char, (map2.get(char) || 0) + 1);
    }
    for (const [key, value] of map) {
      if(map2.has(key)) {
        map.set(key, Math.min(value, map2.get(key)));
      } else {
        map.set(key, 0);
      }
    }
  }
  const temp = [...map.keys()].reduce((acc, cur) => {
    if(map.get(cur) === 1) {
      return[...acc, cur]
    } else if(map.get(cur) > 1){
      return [...acc, ...new Array(map.get(cur)).fill(cur)]
    } else
      return acc
  }, [])
  return temp
}


// commonChars(["bella","label","roller"])

function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) return []
  const sortArr = nums.sort((a, b) => a - b);
  const result: number[][] = [];
  let start = 0
  let end = sortArr.length - 1

  while (start <= end) {
    const sum = sortArr[start] + sortArr[end]
    if (sum <= 0) {
      for (let i = end -1; i > start; i--) {
        if(sortArr[i] + sum < 0) break
        if(sortArr[i] + sum === 0) {
          result.push([sortArr[start], sortArr[i], sortArr[end]])
          break
        }
      }
      if(
        sortArr[start] !== sortArr[start + 1]
      ) {
        start++
      } else {
        while (start < end && sortArr[start] === sortArr[start + 1]) {
          start = start + 2
        }
      }

    } else {
      for (let i = start + 1; i < end; i++) {
        if(sortArr[i] + sum > 0) break
        if(sortArr[i] + sum === 0) {
          result.push([sortArr[start], sortArr[i], sortArr[end]])
          break
        }
      }
      if(
        sortArr[end] !== sortArr[end - 1]
      ) {
        end --
      } else {
        while (start < end && sortArr[end] === sortArr[end - 1]) {
          end  = end -2
        }
      }
    }
  }
  return  result
};

console.log(threeSum([0, 0, 0, 0]))
