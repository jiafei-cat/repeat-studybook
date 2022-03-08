/**
 * 暴力
 * 利用先排序，再找最长递增序列
 * 快排最坏时间复杂度O(n^2) 最好O(n logn)
 */
var longestConsecutive = function(nums) {
  if (!nums.length) {
    return 0
  }
  const sortNumber = quickSort(nums)
  let pre = sortNumber[0]
  let count = 1
  let maxArr = []
  for(let i = 1; i < sortNumber.length; i++) {
    if (sortNumber[i] === pre + 1) {
      count++
    } else {
      maxArr.push(count)
      count = 1
    }
    pre = sortNumber[i]
  }
  maxArr.push(count)

  return Math.max(...maxArr)
};

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  let mid = arr[(arr.length / 2) >> 1]
  let left = []
  let right = []

  for(let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i])
    } 
    if (arr[i] > mid) {
      right.push(arr[i])
    }
  }

  return [...quickSort(left), mid, ...quickSort(right)]
}


/**
 * 思路: 
 * 如何将该问题转化为并查集问题？
 * 遍历list时，判断当前元素的+1/-1是否已经出现过，出现过则联通+1/-1的下标关系
 * 细节: 
 * 实现并查集的时候多一个list来记录每个位置联通的数量，结果取最大联通数量即可
 * 遍历list时已经联通过的给予跳过
 */
 var longestConsecutive = function(nums) {
  if (!nums.length) {
    return 0
  }
  const unionSet = new UnionSet(nums.length)
  const map = {}

  for(let i = 0; i < nums.length; i++) {
    let cur = nums[i]
    if (map[cur]) {
      continue
    }
    if (map[cur - 1]) {
      unionSet.merge(i, nums.indexOf(cur - 1))
    }
    if (map[cur + 1]) {
      unionSet.merge(i, nums.indexOf(cur + 1))
    }
    map[cur] = 1
  }
  return Math.max(...unionSet.count)
};

class UnionSet {
  constructor(length) {
    this.father = Array.from({ length }, (_, i) => i)
    this.count = Array.from({ length }, (_, i) => 1)
  }
  find(index) {
    let curVal = this.father[index]
    return this.father[index] = curVal === index ? index : this.find(curVal)
  }
  merge(a, b) {
    const aVal = this.find(a)
    const bVal = this.find(b)
    if (aVal === bVal) {
      return
    }
    this.father[aVal] = bVal
    this.count[bVal] += this.count[aVal]
  }
}