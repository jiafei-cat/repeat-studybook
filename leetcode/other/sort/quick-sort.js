function quickSort_v1(arr) {
  if (arr.length <= 2) {
    return arr
  }

  let baseIndex = arr.length >> 1
  let base = arr.splice(baseIndex, 1)[0]
  let left = []
  let right = []
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return [...quickSort_v1(left), base, ...quickSort_v1(right)]
}

function quickSort_v2 (arr, left = 0, right = arr.length-1) {
  if (left >= right) {
    return
  }
  let x = left
  let y = right
  let base = arr[left]

  // partition过程
  while(x < y) {
    // 右指针左移
    while(x < y && arr[y] >= base) y--
    // 找到比基准值小的元素，交换位置
    if(x < y) {
      [arr[x], arr[y]] = [arr[y], arr[x]]
      x++
    }
    // 左指针右移
    while(x < y && arr[x] < base) x++
    // 找到比基准值大的元素，交换位置
    if (x < y) {
      [arr[x], arr[y]] = [arr[y], arr[x]]
      y--
    }
  }

  arr[x] = base
  quickSort_v2(arr, left, x - 1)
  quickSort_v2(arr, x + 1, right)
}

// 左递归优化
function partition(D, low, high) {
  let i
  let j
  let s
  while (high > low) {
    i = low
    j = high
    s = D[low]
    while (i < j) {
      while (D[j] > s) {
        j--
      }
      D[i] = D[j]
      while (s >= D[i] && i < j) {
        i++
      }
      D[j] = D[i]
    }
    D[i] = s
    partition(D, low, i - 1)
    low = i + 1
  }
}

function quicksort(D) {
  partition(D, 0, D.length - 1)
}