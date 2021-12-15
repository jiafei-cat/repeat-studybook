/**
 * 与138题一致
 */
var copyRandomList = function(head) {
  let p = head
  // 1. 每个节点后面复制一个节点
  while (p) {
    let temp = p.next
    p.next = new Node(p.val, p.next, p.random)
    p.next.next = temp
    p = p.next.next
  }

  p = head
  // 2. 移动复制节点的random指针
  while (p && p.next) {
    p.next.random = p.next.random ? p.next.random.next : null
    p = p.next.next
  }

  // 3. 将复制节点移出来
  let newListNode = new Node(null, null, null)
  let q = newListNode
  p = head
  while (p) {
    q.next = p.next
    p.next = p.next.next
    p = p.next
    q = q.next
  }

  return newListNode.next
};