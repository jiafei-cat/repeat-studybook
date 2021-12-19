// 递归法
function reverseList(head) {
  // 递归终止条件
  // 因为我们需要将当前节点的下个节点的next指针指向自己所以要保证head.next指针的存在
  if (!head || !head.next) {
      return head // 返回往下最后一个节点，最后一个节点既是反转后的第一个节点
  }
  
  const result = reverseList(head.next)
  head.next.next = head
  head.next = null
  
  return result
}

// 迭代法
const reverseList = head => {
  let cur = head
  let pre = null
  while (cur) {
      let temp = cur.next // 因为下面要改变当前next指针，存储next指针以便下一次遍历
      cur.next = pre
      
      pre = cur // 指向上次节点, 便于下次遍历使用
      cur = temp // 遍历下一个节点
  }
  
  return pre // 反转后最后一个节点既是头节点
}