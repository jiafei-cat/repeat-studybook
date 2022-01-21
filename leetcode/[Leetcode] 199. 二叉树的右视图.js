// 思路: 利用层序遍历，每层的最后一个就是从右侧看树的结果
function rightSideView(root) {
  if (!root) {
    return []
  }
  const stack = [root]
  const reuslt = []
  while(stack.length) {
    let length = stack.length
    for (let i = 0; i < length; i++) {
      let cur = stack.shift()
      if (i === length - 1) {
        reuslt.push(cur.val)
      }
      cur.left && stack.push(cur.left)
      cur.right && stack.push(cur.right)
    }
  }
  return reuslt
}

// 递归: 记录每层depth, 由于先递归右边的，所以右边的层数和操作后的数组长度刚好对上
function rightSideView(root) {
  let result = []
  function dfs(root, depth) {
    if(!root) {
      return
    }
    if (result.length === depth) {
      result.push(root.val)
    }
    depth++

    dfs(root.right, depth)
    dfs(root.left, depth)
  }

  dfs(root, 0)
  return result
}