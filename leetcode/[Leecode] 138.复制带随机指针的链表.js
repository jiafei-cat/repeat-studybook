/**
 * 解题思路:
 * 复制random指针是难点
 * 1. 将个节点都复制一个节点在身后
 * 2. 复制节点的random执行random节点的后一位(后一位是复制出来的)
 * 3. 切割两条链表
 */
function copyRandomList (head) {
  let p = head
  while (p) {
    p.next = new Node(p.val, p.next, p.random)
    p = p.next.next
  }
  p = head
  while (p && p.next) {
    p.next.random = p.next.random ? p.next.random.next : null
    p = p.next.next
  }
  const dummy = new Node(null, null, null)
  let q = dummy
  p = head
  while (p && p.next) {
    q.next = p.next
    p.next = p.next.next
    q = q.next
    p = p.next
  }

  return dummy.next
}