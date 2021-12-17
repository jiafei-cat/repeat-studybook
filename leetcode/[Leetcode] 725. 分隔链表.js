/**
 * 思路: 主要是根据链表长度，算多%k多出来几，就是前多少次组合时候多组合一个
 */
var splitListToParts = function(head, k) {
  let p = head
  let count = 0
  // 步骤一: 计算长度
  while(p) {
    p = p.next
    count++
  }

  const result = []
  let cha = count < k ? 0 : count % k // 余下多少次，内侧遍历多少次加+1
  const time = count < k ? 1 : parseInt(count / k) // 内层最少遍历一次

  p = head
  while (k--) {
    let resultItem = new ListNode(null, null)
    let q = resultItem
    let i = time + (cha > 0 ? 1 : 0)
    cha--
    while(i--) {
      if (!p) {
        break
      }
      q.next = new ListNode(p.val, null)
      q = q.next
      p = p.next
    }
    result.push(resultItem.next)
  }

  return result
};