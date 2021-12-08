function ListNode(val, next, pre) {
  this.val = val
  this.next = next
  this.pre = pre
}

var FrontMiddleBackQueue = function() {
  this.head = new ListNode(null, null, null)
  this.tail = new ListNode(null, null, null)
  this.head.next = this.tail
  this.tail.pre = this.head
  this.count = 0
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function(val) {
  let newNode = new ListNode(val, null, null)
  newNode.next = this.head.next
  newNode.pre = this.head
  this.head.next.pre = newNode
  this.head.next = newNode
  this.count++
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
  if (this.count === 0) {
    this.pushFront(val)
    return
  }
  let newNode = new ListNode(val, null, null)
  let middleIndex = Math.floor(this.count / 2)
  let p = this.head
  while (middleIndex--) {
    p = p.next
  }

  p.next.pre = newNode
  newNode.pre = p
  newNode.next = p.next
  p.next = newNode
  this.count++
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function(val) {
  let newNode = new ListNode(val, null, null)
  newNode.next = this.tail
  newNode.pre = this.tail.pre
  this.tail.pre.next = newNode
  this.tail.pre = newNode
  this.count ++ 
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function() {
  if (this.count < 1) return -1
  let val = this.head.next.val
  this.head.next.next.pre = this.head
  this.head.next = this.head.next.next
  this.count--
  return val
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function() {
  if (this.count < 1) return -1
  let middleIndex = Math.floor(this.count / 2)
  if (this.count % 2 !== 0) middleIndex = middleIndex + 1
  let q = this.head
  while (middleIndex--) {
    q = q.next
  }

  let val = q.val
  q.pre.next = q.next
  q.next.pre = q.pre
  this.count--
  return val
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function() {
  if (this.count < 1) return -1
  let val = this.tail.pre.val

  this.tail.pre.pre.next = this.tail
  this.tail.pre = this.tail.pre.pre
  this.count--
  return val
};