/**
 * 带路径压缩按秩优化的并查集
 */
class UnionSet {
  constructor(length) {
    this.father = Array.from({ length }, (_, i) => i)
    this.size = Array.from({ length }, (_, i) => 1)
  }

  find(index) {
    if (this.father[index] === index) return index
    const target = this.find(this.father[index])
    // 查找路径压缩
    this.father[index] = target
    return target
  }

  merge(a, b) {
    let fa = this.find(a)
    let fb = this.find(fb)
    if (fa === fb) return
    if (this.size[fa] < this.size[fb]) {
      this.father[fa] = fb
      this.size[fb] += this.size[fa]
    } else {
      this.father[fb] = fa
      this.size[fa] += this.size[fb]
    }
  }
}