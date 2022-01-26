/**
 * 带路径压缩的并查集模版
 * 用于节省写代码时间(竞速用)
 */
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