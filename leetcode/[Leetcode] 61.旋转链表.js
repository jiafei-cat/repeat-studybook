const rotateRight = (head, k) => {
  const dummy = new ListNode(null, head)
  let p = dummy
  let count = 0
  while (p && p.next) {
    p = p.next
    count += 1
  }

  
  count = count - (k % count)
  p.next = head
  p = dummy

  while(count--) {
    p = p.next
  }
  
  const result = p.next
  p.next = null
  
  return result
}