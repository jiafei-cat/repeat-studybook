class WeightedQuickUnion {
  constructor(length) {
    // 记录父节点
    this.father = Array.from({ length }, (_, i) => i)
    // 记录当前节点数量
    this.size = Array.from({ length }, (_, i) => 1)
  }
  find(index) {
    if (this.father[index] === index) return
    return this.find(this.father[index])
  }
  merge(a, b) {
    let fa = this.find(a)
    let fb = this.find(b)
    if (fa === fb) return

    // 按节点数量优化，节点数量小的挂到节点数量多的节点下
    if (this.size[fa] < this.size[fb]) {
      this.father[fa] = fb
      this.size[fb] += this.size[fa]
    } else {
      this.father[fb] = fa
      this.size[fa] += this.size[fb]
    }
  }
}