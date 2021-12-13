var postorderTraversal1 = function(root, result = []) {
    if (!root) return result
    postorderTraversal(root.left, result)
    postorderTraversal(root.right, result)
    result.push(root.val)
    return result
};

function postorderTraversal(root) {
    const stack = [] // 模拟执行栈
    let p = root
    let visited = null
    const result = []
    while (stack.length || p) {
        if (p) {
            stack.push(p)
            p = p.left
        } else {
            p = stack.pop()
            if (!p.right || p.right === visited) { // 没有右子树或刚访问过右子树
                result.push(p.val)
                visited = p
                p = null
            } else { // 有右子树并且没有访问
                stack.push(p)
                stack.push(p.right) // 右子树入栈
                p = p.right.left // 转向右子树的左子树
            }
        }
    }
    return result
}