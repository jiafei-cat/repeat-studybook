// 思路: 看作两颗树对比的子问题
var isSymmetric = function(root) {
  return isRight(root, root)
};

function isRight (root1, root2) {
  if (!root1 && !root2) {
    return true
  }
  if ((!root1 && !!root2) || !!root1 && !root2 || root1.val !== root2.val) {
    return false
  }
  
  return isRight(root1.left, root2.right) && isRight(root1.right, root2.left)
}