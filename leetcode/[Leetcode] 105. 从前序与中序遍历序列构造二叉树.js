// 递归
var buildTree = function(preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null
  }

  const cur = preorder.shift() // 取出根节点
  const index = inorder.indexOf(cur) // 去中序遍历找根节点位置，以确定左右子树长度

  const newTreeNode = new TreeNode(cur)
  newTreeNode.left = buildTree(preorder, inorder.slice(0, index))
  newTreeNode.right = buildTree(preorder, inorder.slice(index + 1)) // +1跳过根节点


  return newTreeNode // 返回根节点
}

// 迭代 - 待补