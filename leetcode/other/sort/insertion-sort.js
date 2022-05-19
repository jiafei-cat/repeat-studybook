// 插入排序 - 打扑克常见整理排的方式
function insertionSort_v1(arr) {
  for(let i = 1; i < arr.length; i++) {
    let j = i
    while(j > 0 && arr[j] < arr[j - 1]) {
      // 大小互换位置
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      j--
    }
  }
  return arr
}

function insertionSort_v2(arr) {
  for(let i = 1; i < arr.length; i++) {
    let j = i
    let temp = arr[i]
    // 优化: 将交换位置变为移动
    while(j > 0 && temp < arr[j - 1]) {
      arr[j] = arr[j - 1]
      j--
    }
    // 找到插入的位置
    arr[j] = temp
  }
  return arr
}