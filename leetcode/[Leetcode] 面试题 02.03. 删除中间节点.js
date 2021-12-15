/**
 * 题目还以为是给头节点删除中间节点
 */
var deleteNode = function(node) {
  node.val = node.next.val
  node.next = node.next.next
}