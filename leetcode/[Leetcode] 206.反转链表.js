// 迭代做法
const reverserList = head => {
  let cur = head
  let pre = null

  while (cur) {
    let temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }

  return pre
}


// 递归做法 - 1, 每次都将当前next指针赋值为null
const reverserList = head => {
  if (!head || !head.next) {
    return head
  }

  const result = reverserList(head.next)
  head.next.next = head
  head.next = null

  return result
}

// 递归做法 - 2, 借助变量将记录递归次数，当0时才将头节点next赋值为null
const reverserList = (head, time = 0) => {
  if (!head || !head.next) {
    return head
  }

  const result = reverseList(head.next, time + 1)
  head.next.next = head
  if (time === 0) {
    head.next = null
  }

  return result
}


// 递归n个翻转
const reverseList = (head, time = 0, number = 3) => {
  if (!head || !head.next) {
    return [head, head.next]
  }

  const [result, lastNodeNext] = reverserList(head.next, time + 1, number - 1)
  head.next.next = head

  if (time === 0) {
    head.next = lastNodeNext
  }

  return time === ? result : [result, lastNodeNext]
}


// 简化递归n个翻转 - 借助每次的next指针
const reverseList = (head, number = 3) => {
  if (!head || !head.next) {
    return head
  }  

  let temp = head.next
  const result = reverseList(head.next, number - 1)
  head.next = temp.next
  temp.next = head


  return result
}