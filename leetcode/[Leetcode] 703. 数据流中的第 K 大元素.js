import MinHeap from "./other/MinHeap";
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
  this.k = k
  this.heap = new MinHeap()
  for (let i of nums) {
    this.add(i)
  }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  this.heap.offer(val)
  
  if (this.heap.size() > this.k) {
    this.heap.poll()
  }

  return this.heap.peek()
};