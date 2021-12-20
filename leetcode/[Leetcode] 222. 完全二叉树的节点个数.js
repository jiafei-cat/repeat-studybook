// 递归
var countNodes = function(root) {
  function countNumber(root, sum = 0) {
    if (!root) {
      return sum
    }
    return countNumber(root.left, sum) + countNumber(root.right, sum) + 1
  }

  return countNumber(root)
}

// 学了二分后再写其他解法