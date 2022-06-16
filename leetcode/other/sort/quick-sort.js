function quickSort_v1(arr) {
  if (arr.length <= 2) {
    return arr;
  }

  let baseIndex = arr.length >> 1;
  let base = arr.splice(baseIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort_v1(left), base, ...quickSort_v1(right)];
}

/** 简单版 */
function _quickSort_v1(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const base = arr[0];
  const left = arr.filter((i, _i) => i < base && _i !== 0);
  const right = arr.filter((i, _i) => i >= base && _i !== 0);

  return [..._quickSort_v1(left), base, ..._quickSort_v1(right)];
}

function quickSort_v2(arr, left = 0, right = arr.length - 1) {
  if (left >= right) {
    return;
  }
  let x = left;
  let y = right;
  let base = arr[left];

  // partition过程
  while (x < y) {
    // 右指针左移
    while (x < y && arr[y] >= base) y--;
    // 找到比基准值小的元素，交换位置
    if (x < y) {
      [arr[x], arr[y]] = [arr[y], arr[x]];
      // 交换了该指针就不需要再比较了，所以x++
      x++;
    }
    // 左指针右移
    while (x < y && arr[x] < base) x++;
    // 找到比基准值大的元素，交换位置
    if (x < y) {
      [arr[x], arr[y]] = [arr[y], arr[x]];
      // 交换了该指针就不需要再比较了，所以y--
      y--;
    }
  }

  arr[x] = base;
  quickSort_v2(arr, left, x - 1);
  quickSort_v2(arr, x + 1, right);
}

// 左递归优化
function partition(D, low, high) {
  let i;
  let j;
  let base;
  while (high > low) {
    i = low;
    j = high;
    base = D[low];
    // 通过左右指针对应的值与基准值(base)的比较交换位置
    // 当不满足i<j的条件时，base找到正确位置的指针
    while (i < j) {
      // 左移指针，找到比基准值小的值
      while (D[j] > s) {
        j--;
      }
      // 交换位置
      D[i] = D[j];
      // 右移指针，找到比基准值大的值
      while (s >= D[i] && i < j) {
        i++;
      }
      // 交换位置
      D[j] = D[i];
    }
    // 左右指针比较移动完毕，找到当前partition的位置放置base值
    D[i] = base;
    // 左区间递归
    partition(D, low, i - 1);
    // 右区间范围设置, 通过while(high > low)继续partition
    low = i + 1;
  }
}

function quicksort(D) {
  partition(D, 0, D.length - 1);
}

// 换种写法
function quickSort_v3(arr, left = 0, right = arr.length - 1) {
  if (left >= right) {
    return;
  }
  let x = left;
  let y = right;
  let base = arr[left];

  while (x < y) {
    while (x <= y && arr[y] > base) {
      y--;
    }
    while (x <= y && arr[x] < base) {
      x++;
    }
    if (x < y) {
      [arr[x], arr[y]] = [arr[y], arr[x]];
      x++;
      y--;
    }
  }

  quickSort_v3(arr, left, x - 1);
  quickSort_v3(arr, y + 1, right);
  return;
}
