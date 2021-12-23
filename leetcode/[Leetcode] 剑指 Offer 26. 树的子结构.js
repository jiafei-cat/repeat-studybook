

function isMath(A, B) {
  if (!B) return true // 子树匹配完
  if (!A) return false // A比B树小
  if (A.val !== B.val) return false // 匹配不上

  return isMath(A.left, B.left) && isMath(A.right, B.right) // 节点匹配上，继续左右匹配是否一样
}

var isSubStructure = function(A, B) {
  if(!A || !B) return false

  // 如果当前节点相同，才继续递归往下比较
  if (A.val === B.val && isMath(A, B)) {
    return true
  }
  // 否则A的左右节点递归和B树对比
  return isSubStructure(A.left, B) || isSubStructure(A.right, B)
};