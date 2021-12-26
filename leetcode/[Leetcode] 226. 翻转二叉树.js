// 递归
 var invertTree1 = function(root) {
  if (!root) {
    return null
  }
  const right = invertTree(root.right)
  const left = invertTree(root.left)

  root.left = right
  root.right = left

  return root
};
// 迭代
function invertTree(root) {
  if (!root) {
    return null
  }
  const stack = [root]

  while(stack.length) {
    let cur = stack.pop()
    let left = cur.left
    let right = cur.right
    cur.left = right
    cur.right = left

    cur.left && stack.push(cur.left)
    cur.right && stack.push(cur.right)
  }

  return root
}