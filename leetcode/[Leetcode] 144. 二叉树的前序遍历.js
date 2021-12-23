var preorderTraversal = function(root) {
  function getNode(root, arr){
    if (!root) {
      return arr
    }
    arr.push(root.val)
    getNode(root.left, arr)
    getNode(root.right, arr)

    return arr
  }
  
  return getNode(root, [])
};


// 迭代  - 前序遍历
var preorderTraversal = function(root) {
  if (!root) {
    return []
  }
  const stack = []
  const result = []
  let p = root

  while(stack.length || p) {
    while (p) {
      result.push(p.val)
      stack.push(p)
      p = p.left
    }
    p = stack.pop()
    p = p.right
  }
  return result
}
// 迭代  - 中序遍历
function inorderTraversal(root) {
  if (!root) {
    return []
  }

  const stack = []
  const result = []
  let p = root

  while(stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }

    p = stack.pop()
    result.push(p.val)
    p = p.right
  }
}

function 