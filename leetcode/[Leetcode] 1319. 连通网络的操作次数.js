/**
 * 思路:
 * 一个重复链接可以链接一个未链接
 * 记录重复链接和一次链接，机器总数减去一次链接的就是未链接的，对比重复链接和未链接的大小即可
 */
var makeConnected = function(n, connections) {
  const unionSet = new UnionSet(n)
  let count = 0 // 重复链接数
  let unionCount = 1 // 一次链接数量

  for(let i = 0; i < connections.length; i++) {
    const first = connections[i][0]
    const last = connections[i][1]
    if (unionSet.find(first) !== unionSet.find(last)) {
      unionCount++
      unionSet.merge(first, last)
    } else {
      count++
    }
  }

  let unLinkCount = n - unionCount // 未链接数量

  return unLinkCount <= count ? unLinkCount : -1
};

class UnionSet {
  constructor(length) {
    this.father = Array.from({ length }, (_, i) => i)
  }
  find(index) {
    let curVal = this.father[index]
    return this.father[index] = curVal === index ? index : this.find(curVal)
  }
  merge(a, b) {
    this.father[this.find(a)] = this.find(b)
  }
}