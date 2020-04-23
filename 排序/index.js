const arr = [3,1,5,9,3,2,9,22,7,6,5]
// 冒泡排序 未优化版 复杂度o(n^2)
const maopao = function(arr) {
    const length = arr.length
    for(let i=0;i<length-1;i++) {
        for(let j=0;j<length-1-i;j++) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}
// console.log(maopao(arr))

// 冒泡优化版

// 选择排序 直接版 复杂度o(n^2)
const xuanze = function(arr) {
    const length = arr.length
    for(let i=0;i<length -1;i++) {
        // let index = i
        for(let j=i;j<length;j++) {
            if(arr[i] > arr[j+1]) {
                let temp = arr[j+1]
                arr[j+1] = arr[i]
                arr[i] = temp
            }
            
        }
    }
    return arr
}

// console.log(xuanze(arr))

// 选择排序 简洁版
let xuanze1 = function(arr) {
    const length = arr.length
    for(let i=0;i<length-1;i++) {
        let index = i
        for(let j=i+1;j<length;j++) {
            index = arr[index] > arr[j] ? j : index
        }
        if(index !== i) {
            let temp = arr[index]
            arr[index] = arr[i]
            arr[i] = temp
        }
    }
    return arr
}
// console.log(xuanze1(arr))

// 插入排序
let charu = function(arr) {
    const length = arr.length
    if (length < 2 || arr == null) {
        return arr
    }
    for(let i=1;i<length;i++) {
        let arrtemp = arr[i]
        for(let j=0;j<i;j++) {
            if(arr[j] >= arrtemp) {
                let temp = arr[j]
                arr[j] = arr[i]
                arr[i] = temp
            }
        }
    }
    return arr
}
let otherCharu = function(arr) {
    const len = arr.length
    if(len < 2 || arr == null) {
        return false
    }
    for(let i=1;i<len;i++) {
        let current = arr[i]
        let j
        for(j=i-1;j>=0 && arr[j] >= current;j--) {
            arr[j+1] = arr[j]
        }
        arr[j+1] = current
    }
    return arr
}

// console.log(otherCharu(arr))

 // 快速排序
 function quickSort(arr) {
    const length = arr.length
    if(length<=1) {
        return arr
    }
    let left = [], right = []
    let basis = arr.splice(0,1)
    arr.forEach(function(v) {
        if(v < basis) {
            left.push(v)
        }else {
            right.push(v)
        }
    })
    return quickSort(left).concat(basis,quickSort(right))
 }
//  console.log(quickSort(arr))

let guiBing = function(arr, low, high) {
    const len = arr.length
    if(low >= high || len < 2 || arr == null) {
        return false
    }
    const mid = Math.floor((low + high) / 2)
    guiBing(arr,low,mid)
    guiBing(arr,mid+1,high)
    merge(arr,low,mid,high)
}

let merge = function(arr, low, mid, high) {
    let tmepArr = [...arr]
    let k = low 
    let i = low
    let j = mid + 1
    while(k <= high) {
        if(i > mid) 
            arr[k++] = tmepArr[j++]
        else if(j > high)
            arr[k++] = tmepArr[i++]
        else if(tmepArr[i] > tmepArr[j])
            arr[k++] = tmepArr[j++]
        else
            arr[k++] = tmepArr[i++]
    }
    console.log(k,tmepArr.length,arr)
    // if(k === tmepArr.length) {
    //     console.log(arr,k)
    // }
}
guiBing(arr,0,arr.length -1)