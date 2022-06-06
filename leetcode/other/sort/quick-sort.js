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

function quickSort_v2 (arr, left = 0, right = arr.length) {
  if (left >= right) {
    return
  }
  let x = left
  let y = right
  let base = arr[left]

  while(x < y) {
    // 找到右边比base小的值
    while(x < y && arr[y] >= base) y--
    // 交换位置
    if(x < y) arr[x++] = arr[y]

    // 找到左边比base大的值
    while(x < y && arr[x] < base) x++
    // 交换位置
    if (x < y) arr[y--] = arr[x]
  }

  arr[x] = base
  quickSort_v2(arr, left, x - 1)
  quickSort_v2(arr, x + 1, right)
  return
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