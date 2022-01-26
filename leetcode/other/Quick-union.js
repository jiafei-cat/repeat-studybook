class QuickUnion {
  constructor(length) {
    // 记录父节点编号
    this.father = Array.from({ length }, (_, i) => i)
  }
  find(index) {
    // 自己是自己的父节点，自己是根节点了
    if (this.father[index] === index) return index
    // 继续往上找
    return this.find(this.father[index])
  }
  merge(a, b) {
    const fa = this.find(a)
    const fb = this.find(b)
    // 同父级说明是一个集合
    if (fa === fb) return
    // 将fa挂到fb下
    this.father[fa] = fb
    return
  }
}