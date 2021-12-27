// 根据平衡二叉树特点，每个节点的高度差不能大于1
// 回溯的过程记录左右两边的高度，每个节点再将记录的左右子树高度相减判断即可
var isBalanced = function(root) {
  function dfs(root) {
    if (!root) {
      return 0
    }

    let left = dfs(root.left) // 左子树高度
    let right = dfs(root.right) // 右子树高度

    // 两边高度相减如果大于1就不是平衡二叉树了
    // 当left或right一边已经有不相等时直接回溯-1
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1
    } else {
      // 子树的高度取决于最高子树， 回溯上一层需要+1高度
      return Math.max(left, right) + 1
    }
  }
  return dfs(root) !== -1
}