/**
 * 又一种新的方式进行递归层序遍历，不需要记录depth
 * 思路: 每次递归一层，一层一层的处理(抽象层一层一层递归而不是以前左右往下递归，这样就可以让代码同步在递归还是回溯的过程)
 */
var levelOrderBottom = function(root) {
  if (!root) {
    return []
  }

  const result = []

  function bfs(root) {
    let temp = []

    if (root.length) {
      for (let i = 0; i < root.length; i++) {
        root[i].left && temp.push(root[i].left)
        root[i].right && temp.push(root[i].right)
      }
    }

    temp.length && bfs(temp)
    result.push(root.map(i => i.val))
  }
  bfs([root])
  return result
}

// 迭代只需要倒序记录即可
function levelOrderBottom (root) {
  if (!root) {
    return []
  }

  const queue = [root]
  const result = []
  while(queue.length) {
    let length = queue.length
    result.unshift([])
    for(let i = 0; i < length; i++) {
      let cur = queue.shift()
      result[0].push(cur.val)

      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }
  }

  return result
}