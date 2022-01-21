// 利用二叉搜索树特点，中序遍历既是从小到大遍历
var kthSmallest = function(root, k) {
  const stack = []
  while(root || stack.length) {
    while(root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (--k === 0) {
      return root.val
    }
    root = root.right
  }
}