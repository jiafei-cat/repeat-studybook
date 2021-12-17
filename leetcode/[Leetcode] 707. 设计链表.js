/** 
 * 单链表，感觉面向调试解题了。。。
 */
function ListNode(val, next) {
  return { val, next }
}
var MyLinkedList = function() {
  this.linkedList = new ListNode(null, null)
  this.count = 0
};

MyLinkedList.prototype.get = function(index) {
  if(index >= this.count) {
    return -1
  }
  let p = this.linkedList
  console.log(JSON.stringify(p))
  index = index + 1
  while (index--) {
    p = p.next
  }
  return p ? p.val : -1
};

MyLinkedList.prototype.addAtHead = function(val) {
  let temp = this.linkedList.next
  this.linkedList.next = new ListNode(val, temp)
  this.count++
};

MyLinkedList.prototype.addAtTail = function(val) {
  let p = this.linkedList
  while (p && p.next) {
    p = p.next
  }
  p.next = new ListNode(val, null)
  this.count++
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index <= 0) {
    this.addAtHead(val)
    return
  }
  if (index > this.count) {
    return
  }

  let p = this.linkedList
  while (index--) {
    p = p.next
  }
  let temp = p.next
  p.next = new ListNode(val, temp)
  this.count++
};

MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index < 0 || index >= this.count) {
    return
  }

  let p = this.linkedList
  while (index--) {
    p = p.next
  }
  p.next = p.next?.next || null
};
