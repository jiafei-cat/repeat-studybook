var reverseBetween = function(head, left, right) {
  // 通过示例和提示范围得知翻转次数为right减left加1(提示left和right都小于链表长度且大于1)
  const time = right - left + 1
  // 头节点可以会被翻转，创建个虚拟头节点方便操作头节点
  const dummy = new ListNode(null, head)
  let p = dummy

  // 找到翻转前的头一个节点，为了方便翻转后拼接(所以这里是--left)
  while (--left) {
    p = p.next
  }

  // 拼接翻转后的节点
  p.next = reverse(p.next, time)

  return dummy.next // 返回虚拟
};

function reverse(head, n) {
  // 翻转次数为1了就不需要翻转了，返回翻转后的第一个节点
  if (!head || !head.next || n === 1) {
    return head
  }

  const result = reverse(head.next, n - 1)

  // 递归往上的过程要修改head的next指针，所以在往下的过程保存head的next指针便于操作
  let temp = head.next
  head.next = head.next.next // 传递最后一个节点的next指针
  temp.next = head

  return result
}