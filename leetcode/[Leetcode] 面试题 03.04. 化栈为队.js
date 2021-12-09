/**
 * 用双栈模拟队列
 * 一个栈用来装正序装入队的
 * 一个栈用来装倒序出队的的
 */
var MyQueue = function() {
  this.stack_1 = []
  this.stack_2 = []
};

MyQueue.prototype.push = function(x) {
  this.stack_1.push(x)
};

MyQueue.prototype.pop = function() {
  if (!this.stack_2.length) {
    while (this.stack_1.length) {
      this.stack_2.push(this.stack_1.pop())
    }
  }
  return this.stack_2.pop()
};

MyQueue.prototype.peek = function() {
  return this.stack_2[this.stack_2.length - 1] || this.stack_1[0]
};

MyQueue.prototype.empty = function() {
  return !this.stack_1.length && !this.stack_2.length
};