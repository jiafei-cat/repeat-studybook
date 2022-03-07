// 联通性问题，发现已经联通的节点将其返回
var findRedundantConnection = function(edges) {
  const unionSet = new UnionSet(edges.length)

  for (let i = 0; i < edges.length; i++) {
    const first = edges[i][0]
    const last = edges[i][1]
    if (unionSet.find(first) !== unionSet.find(last)) {
      unionSet.merge(first, last)
    } else {
      return edges[i]
    }
  }
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