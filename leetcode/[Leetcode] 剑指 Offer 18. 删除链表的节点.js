/**
 * 缓存上次指针
 */
var deleteNode = function(head, val) {
  let newListNode = new ListNode(null, head)
  let p = newListNode
  let pre = p

  while (p) {
    p = p.next
    if (p.val === val) {
      break
    }
    pre = p
  }
  pre.next = pre.next?.next || null

  return newListNode.next
};

/**
 * 双指针
 */
var deleteNode = function(head, val) {
  let newListNode = new ListNode(null, head)
  let p1 = newListNode
  let p2 = newListNode.next

  while (p2 && p2.val !== val) {
    p1 = p1.next
    p2 = p2.next
  }

  p1.next = p1.next?.next || null

  return newListNode.next
};