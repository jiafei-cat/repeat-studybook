// 重复题
var partition = function(head, x) {
  let l1 = new ListNode(null, null)
  let l2 = new ListNode(null, null)
  let p1 = l1
  let p2 = l2

  while(head) {
    if (head.val < x) {
      p1.next = head
      p1 = p1.next
    } else {
      p2.next = head
      p2 = p2.next
    }
    head = head.next
  }
  p2.next = null
  p1.next = l2.next
  return l1.next
};