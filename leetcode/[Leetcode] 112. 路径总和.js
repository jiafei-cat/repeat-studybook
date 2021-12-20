// 累加dfs到叶子节点判断数值
function hasPathSum(root, targetSum) {
  // 为空判断，避免下面根节点没有left，right节点的情况
  if (!root) {
    return false
  }

  let hasTargetSum = false // 当递归到叶子节点如果满足条件则改变该值
  function sumChildNode(root, sum = 0) {
    if (!root.left && !root.right) {
      sum += root.val // 累加叶子节点的值
      if (sum === targetSum && !hasTargetSum) hasTargetSum = true
    }

    root.left && sumChildNode(root.left, sum + root.val)
    root.right && sumChildNode(root.right, sum + root.val)
  }

  sumChildNode(root)

  return hasTargetSum
}

// 利用减法操作，如果到达叶子节点sum值为0说明有targetSum
function hasPathSum(root, targetSum) {
  if (!root) {
    return false
  }

  if (!root.left && !root.right) {
    return targetSum === root.val // 这里相当于 (targetSum -= root.val) === 0
  }

  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val) 
}



// BFS
function hasPathSum(root, targetSum) {
  if (!root) {
    return false
  }
  const queue = [root]
  const val = [root.val]
  
  while (queue.length) {
    cur = queue.shift()
    curVal = val.shift()
    
    // 叶子节点
    if (!cur.left && !cur.right) {
      if (curVal === targetSum) {
        return true
      }
    }
  
    if (cur.left) {
      queue.push(cur.left)
      val.push(curVal + cur.left.val)
    }
  
    if (cur.right) {
      queue.push(cur.right)
      val.push(curVal + cur.right.val)
    }
  }
  
  return false
}