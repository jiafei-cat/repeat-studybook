var getLeastNumbers = function(arr, k) {
  return arr.sort((a, b) => a - b).slice(0, k)
};

// 冒泡排序
// 前后对比互换位置
function getLeastNumbers(arr, k) {
  let n = arr.length
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {
        // 交换位置三种方式
        // 1.中间变量
        let temp1 = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp1
        // // 2.利用差值
        // arr[j] = arr[j] + arr[j]
        // arr[j] = arr[j] - arr[j]
        // arr[j] = arr[j] - arr[j]
        // 3.解构赋值
        // [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr.slice(arr, k)
}

// @todo其他排序