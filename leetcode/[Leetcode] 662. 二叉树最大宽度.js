// 思路: 本质还是层序遍历-BFS，利用给二叉树编号
// 给二叉树节点编号，某节点为i, 那么它的左子树大小为left = 2i，右子树大小为right = 2i+1
// 那么就可以得出层级宽度: right - left + 1

function widthOfBinaryTree(root) {
  // 用二位数组队列记录当前层级的节点和序号
  let queue = [[root, 0]]
  // 记录最长宽度
  let maxWith = 0
  // 极端情况下右子树的编号会超过最大安全数导致计算失效，这里给它计算结果取余
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER

  // 以下是BFD的遍历
  while(queue.length) {
    let length = queue.length
    // 判断当前层的宽度，每层比较取最大值
    maxWith = Math.max(maxWith, queue.length > 1 ? queue[queue.length - 1][1] - queue[0][1] + 1 : 1)
    for (let i = 0; i < length; i++) {
      let cur = queue.shift()
      if (cur[0]) {
        cur[0].left && queue.push([cur[0].left, (cur[1] * 2) % MAX_SAFE_INTEGER])
        cur[0].right && queue.push([cur[0].right, (cur[1] * 2 + 1) % MAX_SAFE_INTEGER])
      }
    }
  }

  return maxWith
}