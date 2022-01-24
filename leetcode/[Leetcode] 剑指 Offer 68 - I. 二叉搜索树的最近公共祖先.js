// 利用二叉搜索树的特点，左右寻找目标父节点
var lowestCommonAncestor = function(root, p, q) {
  let parent = root
  while(true) {
    if (p.val < parent.val && q.val < parent.val) {
      parent = parent.left
    } else if (p.val > parent.val && q.val > parent.val) {
      parent = parent.right
    } else {
      break
    }
  }
  return parent
};