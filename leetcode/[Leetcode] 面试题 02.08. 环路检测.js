// 与142重复
var detectCycle1 = function(head) {
  if (!head || !head.next) {
    return null
  }
  let fast = head
  let slow = head
  while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      break
    }
  }

  if (!fast || !fast.next) {
    return null
  }

  fast = head
  while (fast && fast.next) {
    if (fast === slow) {
      break
    }
    fast = fast.next
    slow = slow.next
  }

  return fast
};

function detectCycle(head) {
  const map = new Set()
  while(head) {
    if (map.has(head)) {
      return head
    }
    map.add(head)
    head = head.next
  }

  return null
}