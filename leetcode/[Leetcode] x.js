/**
 * 每个节点需要记录三种状态 1. 自己不需要摄像头 2.自己有摄像头 3. 要求父节点有摄像头
 * 每个节点都有三个状态, 
 * 题目求最少摄像头，所以后序遍历比较合适
 */
var minCameraCover = function(root) {
  let result = 0
  if (getNode(root) === 0) {
      result++
  }

  function getNode(node) {
    if (!node) return 1
    let left = getNode(node.left)
    let right = getNode(node.right)
    if (left === 0 || right === 0) {
      result++
      return 2
    }
    if(left === 1 && right === 1) return 0
    if(left === 2 || right === 2) return 1
  }

  return result
}