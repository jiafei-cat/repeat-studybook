// 利用层级区域使用不同方法
var zigzagLevelOrder = function(root) {
  if (!root) {
    return []
  }
  let stack = [root]
  const result = []
  let depth = 0
  while(stack.length) {
    let temp = []
    let length = stack.length
    result.push([])
    depth = depth + 1

    while(length--) {
      cur =  stack.shift()

      if (depth % 2 === 0) {
        result[result.length - 1].unshift(cur.val)
      } else {
        result[result.length - 1].push(cur.val)
      }

      cur.left && temp.push(cur.left)
      cur.right && temp.push(cur.right)
    }

    stack = temp
  }

  return result
};