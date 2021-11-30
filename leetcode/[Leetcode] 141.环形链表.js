// 快慢指针实现
const hasCycle = head => {
  if (!head) {
    return false
  }

  let slow = head
  let fast = head.next
  while(fast && fast.next) {
    if (slow === fast) {
      return true
    }
    slow = slow.next
    fast = fast.next.next
  }

  return false
}

// 哈希表实现
const hasCycle = head => {
  const visited = new Set()

  while(head) {
    if (visited.has(head)) {
      return true
    }
    visited.add(head)
    head = head.next
  }
  return false
}