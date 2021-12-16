/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 思路：翻转l1,l2,相加运算后，再翻转回来
 */
var addTwoNumbers = function(l1, l2) {
  let pre1 = reverse(l1) // 翻转l1
  let pre2 = reverse(l2) // 翻转l2

  let p = null
  let preSum = 0 // 保留上次进位
  // 翻转后每项相加
  while (pre1 || pre2 || preSum) {
    let sum = (pre1?.val || 0) + (pre2?.val || 0) + preSum
    preSum = sum > 9 ? 1 : 0
    let curNode = new ListNode(sum % 10, null)
    curNode.next = p // 新节点next指向上一个新节点实现倒叙
    p = curNode
    pre1 = pre1 ? pre1.next : pre1
    pre2 = pre2 ? pre2.next : pre2
  }
  return p
};

function reverse(head) {
  if (!head || !head.next) {
    return head
  }
  
  let temp = head.next
  const result = reverse(head.next)
  head.next = temp.next
  temp.next = head

  return result
}

/**
 * 思路: 出栈实现倒叙计算
 */
function addTwoNumbers(l1, l2) {
  const stackL1 = []
  const stackL2 = []
  while(l1 || l2) {
    if (l1) {
      stackL1.push(l1.val)
      l1 = l1.next
    }
    if (l2) {
      stackL2.push(l2.val)
      l2 = l2.next
    }
  }

  let p = null
  let preSum = 0

  while(stackL1.length || stackL2.length || preSum) {
    let l1Val = stackL1.pop() || 0
    let l2Val = stackL2.pop() || 0
    let sum = l1Val + l2Val + preSum
    preSum = sum > 9 ? 1 : 0
    let curNode = new ListNode(sum % 10, null)
    curNode.next = p // 新节点next指向上一个新节点实现倒叙
    p = curNode
  }
  return p
}