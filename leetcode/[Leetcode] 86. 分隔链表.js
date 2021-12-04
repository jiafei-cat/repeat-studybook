const partition = function(head, x) {
  let left = new ListNode(null, null)
  let right = new ListNode(null, null)
  const leftHead = left
  const rightHead = right
  let p = head
  while (p) {
      if (p.val < x) {
          left.next = p
          left = left.next
      } else {
          right.next = p
          right = right.next
      }
      p = p.next
  }

  right.next = null
  left.next = rightHead.next
  
  return leftHead.next
}