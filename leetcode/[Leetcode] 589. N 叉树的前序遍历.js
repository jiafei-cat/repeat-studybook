/**
 * 递归
 */
var preorder = function(root, arr = []) {
  if (!root) {
    return arr
  }
  arr.push(root.val)
  if (root.children.length) {
    for(let i = 0; i < root.children.length; i++) {
      preorder(root.children[i], arr)
    }
  }

  return arr
};

/**
 * 非递归(维护调用栈)
 */
function perorder(root) {
  const stack = []
  const result = []
  let p = root
  stack.push(root)

  while (stack.length) {
    let cur = stack.pop()
    result.push(cur.val)
    for(let i = 0; i < cur.children.length; i++) {
      stack.push(cur.children[i])
    }
  }

  return result
}