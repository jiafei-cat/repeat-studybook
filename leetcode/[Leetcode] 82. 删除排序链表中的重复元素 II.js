const deleteDuplicates = head => {
  const dummy = new ListNode(null, head)
  let p = dummy

  while (p && p.next) {
    let q = p

    // 找到下一个不相同的节点
    while (q.next && q.val === q.next.val) {
      q = q.next
      p = pre // 有重复元素让p 回到上次节点位置，方便拼接
    }

    pre = p
    p.next = q.next // 拼接下一个不相同的节点
    p = p.next
  }

  return dummy.next
}