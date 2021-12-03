const deleteDuplicates = head => {
  let q = head

  while (q && q.next) {
    // 一次遍历：当前节点的值如果和下个相等，则替换next指针为下下个指针
    // 二次遍历: 当前节点再和下下个指针比较是否相等, 不相等则遍历下个节点
    if (q.val === q.next.val) {
      q.next = q.next.next
    } else {
      q = q.next
    }
  }

  return head
}