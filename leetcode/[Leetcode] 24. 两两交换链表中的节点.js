// 相当于K个一组翻转将k指定为2了
const swapPairs = head => {
  const dummy = new ListNode(null, head)
  let p = dummy
  let q = p.next

  while ((p.next = reverseN(p.next, 2)) !== q) {
    p = q
    q = p.next
  }

  return dummy.next
}


function reverseN (head, n) {
  let count = 0
  let p = head
  while(p) {
    p = p.next
    count += 1
  }

  if (count >= n) {
    return reverse(head, n)
  }

  return head
}

function reverse(head, n) {
  if (!head || !head.next || n === 1) {
    return head
  }

  const tail = head.next
  const result = reverse(head.next, n - 1)
  head.next = tail.next
  tail.next = head

  return result
}