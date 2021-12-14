
/**
 * 迭代+缓存
 */
const kthToLast1 = function(head, k) {
  let i = head
  let p = 0
  let obj = []
  while (i) {
    obj.push(i.val)
    i = i.next
    p++
  }

  return obj[p - k]
};

/**
 * 利用双指针，总是距离k
 * 注意: 题目说的k保证是有效的
 */
const kthToLast2 = function(head, k) {
  let fast = head
  let slow = head

  while (k-- && fast) {
    fast = fast.next
  }

  while (fast) {
    fast = fast.next
    slow = slow.next
  }

  return slow.val
};

/**
 * 递归, 归的时候判断是第几次归了
 */
const kthToLast = function(head, k) {
  let count = 0
  function forEachListNode(head, k) {
    if (!head) {
      return head
    }

    const result = forEachListNode(head.next, k)

    count += 1 // 递归，归的过程开始累加
    if (count === k) {
      return head.val
    }

    return result
  }

  return forEachListNode(head, k)
};