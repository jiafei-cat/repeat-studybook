const reverse = (head, n) => {
  if (n === 1) {
    return head
  }

  const temp = head.next
  const result = reverse(head.next, n - 1)

  head.next = temp.next
  temp.next = head

  return result
}


const reverseBetween = (head, left, right) => {
  const cha = right - left + 1
  const newListNode = new ListNode(null, head)
  let cur = newListNode
  while (--left) {
    cur = cur.next
  }

  cur.next = reverse(cur.next, cha)

  return newListNode.next
}