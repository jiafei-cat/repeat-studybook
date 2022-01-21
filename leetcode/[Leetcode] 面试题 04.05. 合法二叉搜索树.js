// 递归
function isValidBST1(root) {
  function dfs(root, low, high) {
    if (!root) {
      return true
    }
    if (root.val <= low || root.val >= high) {
      return false
    }

    return dfs(root.left, low, root.val) && dfs(root.right, root.val, high)
  }

  return dfs(root, -Infinity, Infinity)
}

// 迭代: 中序遍历
function isValidBST(root) {
  let temp = -Infinity
  const stack = []

  while(stack.length || root) {
    while(root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()

    if (temp >= root.val) {
      return false
    }

    temp = root.val
    root = root.right
  }
  return true
}