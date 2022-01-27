// 利用并查集求多少个省份
var findCircleNum = function(isConnected) {
  const unionSet = new UnionSet(isConnected.length)
  for(let i = 0; i < isConnected.length; i++) {
    for(let j = 0; j < isConnected[i].length; j++) {
      if (isConnected[i][j]) {
        unionSet.merge(i, j)
      }
    }
  }
  let result = 0
  for (let i = 0; i < isConnected.length; i++) {
    if (unionSet.find(i) === i) result++
  }

  return result
}

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