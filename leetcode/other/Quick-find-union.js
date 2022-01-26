// quick-find - 并查集
class QuickFindUnion {
  color = []
  constructor(length) {
    this.color = Array.from({ length }, (i, index) => index)
  }
  find(index) {
    return this.color[index]
  }
  merge(a, b) {
    if (this.color[a] === this.color[b]) return
    const target = this.color[a]
    for(let i = 0; i < this.color.length; i++) {
      if (this.color[i] === target) {
        this.color[i] = this.color[b]
      }
    }
    return
  }
}