// 递归
var maxDepth = function(root) {
  if (!root) {
    return 0
  }

  let left = maxDepth(root.left)
  let right = maxDepth(root.right)

  return Math.max(left, right) + 1
}

// 层序遍历
var maxDepth = function(root) {
  if (!root) {
    return 0
  }
  let stack = [root]
  let depth = 0
  while(stack.length) {
    let length = stack.length
    depth += 1
    for(let i = 0; i < length; i++) {
      let cur = stack.shift()
      cur.left && stack.push(cur.left)
      cur.right && stack.push(cur.right)
    }
  }

  return depth
};