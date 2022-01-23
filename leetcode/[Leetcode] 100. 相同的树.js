// 递归
var isSameTree = function(p, q) {
  if (!p && !q) {
    return true
  }

  if ((!p && !!q) || (!!p && !q) || (p.val !== q.val)) {
    return false
  }

  let left = isSameTree(p.left, q.left)
  let right = isSameTree(p.right, q.right)

  return left && right
}

// 层序遍历
function isSameTree(q, p) {
  if (!q && !p) {
    return true
  }
  if ((!q && !!p) || (!!q && !p)) {
    return false
  }
  let stack1 = [q]
  let stack2 = [p]
  while (stack1.length || stack2.length) {
    let length1 = stack1.length
    let length2 = stack2.length

    if (length1 !== length2) {
      return false
    }

    for (let i = 0; i < length1; i++) {
      let cur1 = stack1.shift()
      let cur2 = stack2.shift()
      console.log(cur1)
      console.log(cur2)

      if (cur1.val !== cur2.val) {
        return false
      }
      if (
        (!cur1.left && !!cur2.left) || (!!cur1.left && !cur2.left) ||
        (!cur1.right && !!cur2.right) || (!!cur1.right && !cur2.right)
      ) {
        return false
      }
      cur1.left && stack1.push(cur1.left)
      cur1.right && stack1.push(cur1.right)
      cur2.left && stack2.push(cur2.left)
      cur2.right && stack2.push(cur2.right)
    }
  }

  return true
}