/**
 * 将每个位置当作为2的空，碰到#减1，到0上次节点减1
 */
 var isValidSerialization1 = function(preorder) {
  // #也是有效的
  if (preorder === '#') {
    return true
  }
  const arr = preorder.split(',')
  const stack = []

  for (let i = 0; i < arr.length; i++) {
    // 避免1###清空
    if (!stack.length && i !== 0) {
      return false
    }
    if (arr[i] !== '#') {
      stack.push(2)
    }

    if (arr[i] === '#') {
      stack[stack.length - 1] -= 1
      while (stack[stack.length - 1] === 0) {
        stack.pop()
        if (stack.length) {
          stack[stack.length - 1] -= 1
        }
      }
    }
  }
  return !stack.length
};

/**
 * 计数
 */
function isValidSerialization(preorder) {
  // 为什么初始化是1
  // 因为碰到非#时，是减1再加2
  let count = 1
  const arr = preorder.split(',')
  const length = arr.length

  for (let i = 0; i < length; i++) {
    count -= 1
    if (count < 0) {
      return false
    }
    if (arr[i] !== '#') {
      count += 2
    }
  }

  return count === 0
}

