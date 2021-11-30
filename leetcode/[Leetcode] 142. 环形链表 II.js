// 快慢指针实现
// 设slow指针经过a步到达入口 - slow = a
// 那么fast指针已经在环的a位置 - fast = 2a
// 设fast指针距离环形链表入口c步 - 链表长度 = 2a + c 环大小 = a + c

// fast与slow相差c步，fast走2c步追上slow - 相遇
// 相遇此时: slow走了c步，已知环大小 a + c, 相遇点距离入口 a步, 链表头距离环入口也是a步
// 重置一个指针，同时让双指针走a步(相等点)既是环入口

const detectCycle = head => {
  if (!head || !head.next) {
    return -1
  }

  let fast = head.next
  let slow = head

  while(fast && fast.next) {
    if (fast === slow) {
      break
    }
    fast = fast.next.next
    slow = slow.next
  }

  if (!fast) {
    return -1
  }
  
  fast = head

  while (fast && fast.next) {
    if (fast === slow) {
      return fast
    }
    fast = fast.next
    slow = slow.next
  }
}


// 哈希表
const detectCycle = head => {
  const visited = new Set()
  while (head) {
    if (visited.has(head)) {
      return head
    }
    visited.add(head)
    head = head.next
  }

  return null
}