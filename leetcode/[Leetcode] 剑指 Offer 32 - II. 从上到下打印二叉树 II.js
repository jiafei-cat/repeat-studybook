// 层序遍历迭代话，注意出队方向
// 递归的话要记录深度

// 迭代
var levelOrder = function(root) {
  if (!root) {
    return []
  }
  const queue = [root]
  const result = []
  while (queue.length) {
    let length = queue.length
    result.push([])

    for (let i = 0; i < length; i++) {
      let cur = queue.shift()
      result[result.length - 1].push(cur.val)
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }
  }

  return result
};
// 递归
function levelOreder(root, arr = [], depth = 0) {
  if (!root) {
    return
  }

  if (!arr[depth]) {
    arr[depth] = []
  }
  arr[depth].push(root.val)
  root.left && levelOreder(root.left, arr, depth + 1)
  root.right && levelOreder(root.right, arr, depth + 1)

  return arr
}