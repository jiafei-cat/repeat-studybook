// 思路: 递归
// 递归的时候传入两个头指针: 
// 递的时候让一个指针走到底
// 回溯的时候让另一个指针走到底
// 实现细节，如果找到中间节点
var reorderList = function(head) {
  // 偶数数链表情况
  // 1 2 3 4 head
  // 4 3 2 1 tail
  // 1->next = 4  4->next = temp1->next = 2
  // 2->next = 3  3->next = temp2->next = 3 出现相同节点, 偶数链表当next指针与当前指针一致，继续操作会出现环
  
  // 奇数链表情况
  // 1 2 3 4 5 head
  // 5 4 3 2 1 tail
  // 1->next = 5  5->next = temp1->next = 2
  // 2->next = 4  4->next = temp2->next = 3
  // 3->next = 3  2->next = temp3->next = 4 // 出现递归指针和回溯指针一直的情况，继续操作会出现环
  // 到达这两个条件断开链表，并后续回溯不进行操作

  function getNode(head, tail) {
    if (!head) {
      return tail
    }
    const tailNode = getNode(head.next, tail)
    let temp = tailNode.next

    if (tailNode === 'done') {
      return tailNode
    }
    // 偶数是tailNode与head相等
    // 奇数是tailNode.next与head相等
    // 满足其中一个条件后说明操作已经完成，后续回溯不需要操作节点了
    if (tailNode === head || temp === head) {
      head.next = null
      return 'done'
    }

    tailNode.next = head // 1 -> 4
    head.next = temp // 4 -> temp1 -> 2

    return temp
  }
  const result = head
  getNode(head, head)
  return result
};

/**
 * 思路: 直接转为数组操作
 */
function reorderList(head) {
  const arr = []
  let p = head
  while(p) {
    arr.push(p.val)
    p = p.next
  }

  let i = 0
  p = head
  // 这里可以优化成双指针前后往中间遍历
  while (i < arr.length) {
    let tail = arr.length - i - 1
    
    if (i + 1 === tail) {
      p.next = new ListNode(arr[tail], null)
      p = p.next
      p.next = null
      break
    }
    if (i === tail){
      p.next = null
      break
    }
    p.next = new ListNode(arr[tail], null)
    p = p.next
    p.next = new ListNode(arr[i + 1], null)
    p = p.next

    i++
  }

  return head.next
}