/**
 * 与面试02.02题目一样
 * 递归法
 */
var getKthFromEnd1 = function(head, k) {
  let i = 0
  function getListNode(head, k) {
    if (!head) {
      return
    }

    let result = getListNode(head.next, k)
    i = i + 1

    if (i === k) {
      result = head
    }
    return result
  }

  return getListNode(head, k)
};

/**
 * 双指针
 */
var getKthFromEnd = function(head, k) {
  let fast = head
  let slow = head
  let i = k
  while (i--) {
    fast = fast.next
  }
  while (fast) {
    fast = fast.next
    slow = slow.next
  }

  return slow
};