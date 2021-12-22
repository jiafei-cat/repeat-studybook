// 因为是二叉搜索树，左右根的大小为，左 < 根 < 右
// 题目要求第k大，为所以回溯顺序为 右 -> 根 -> 左
var kthLargest = function(root, k) {
  function getNode(root) {
    if (!root) {
      return 0
    }
    // 先遍历右节点，让最深右节点输出
    const right = getNode(root.right)
    // 中序遍历位置
    if (--k === 0) {
      return root.val
    }
    const left = getNode(root.left)

    return right + left // 为了方便将结果传递回来使用累加(递归终止条件是0， 一边是结果)
  }

  return getNode(root)
};