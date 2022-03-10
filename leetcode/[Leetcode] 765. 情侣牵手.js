/**
 * 分析题目
 * [[0,2], [4,1], [3,5], [6,8], [7,9]]
 * 上面数据分析:
 * 前3个为一个联通组，后2个为一个联通组(已经正确位置上的单独一个联通组)
 * 前3个最少2次交换，后2个最少1次交换，所以等于3
 * 交换完后5个联通组，减去未交换前2个，也是3个
 * 类推得到规律
 * 交换之后的联通数 - 未交换前的联通数量 = 最少交换数
 * 如何联通数字组：
 * 正确的情侣必定是奇偶组，且除2下取整相等
 * [[0,2], [4,1], [3,5], [6,8], [7,9]]
 * 除二取整后
 * [[0,1], [2,0], [1,2], [3,4], [3,4]]
 * 由此可以得到交换前的联通数量
 */
var minSwapsCouples = function(row) {
  const length = row.length >> 1 // 一共有多少对情侣
  const unionSet = new UnionSet(length)
  for (let i = 0; i < row.length; i+=2) {
    unionSet.merge(row[i] >> 1, row[i + 1] >> 1)
  }
  return length - unionSet.count
};

class UnionSet {
  constructor(length) {
    this.father = Array.from({ length }, (_, i) => i)
    this.count = length // 用来记录联通数
  }
  find(index) {
    let curVal = this.father[index]
    return this.father[index] = curVal === index ? index : this.find(curVal)
  }
  merge(a, b) {
    let curA = this.find(a)
    let curB = this.find(b)
    if (curA === curB) {
      return
    }
    this.father[curA] = curB
    this.count--
  }
}