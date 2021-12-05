// Q: 什么时候用--cha, 什么时候用cha-- 
// A: cha = 2, --cha只会执行2次，cha--是3次, 根据需求使用
// Q: 什么时候用p, 什么时候用 p && p.next
// A: 如果是判断是p那么会走到最后一个null节点
// 经常使用js !!p判断的会觉得为什么最后一个节点是null还会遍历的到，
// 是因为最后一个节点的值是null(Node.val), 注意是值, p 代表的是一个节点
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(null, head)
  let p = dummy
  let count = 0
  while (p && p.next) {
    count += 1
    p = p.next
  }

  let cha = count - n
  p = dummy
  while (cha--) {
    p = p.next
  }

  p.next = p.next?.next || null

  return dummy.next
}

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(null, head)
  let fast = dummy
  let slow = dummy

  while (n--) {
    fast = fast.next
  }

  while (fast && fast.next) {
    fast = fast.next
    slow = slow.next
  }

  slow.next = slow.next?.next || null

  return dummy.next
}