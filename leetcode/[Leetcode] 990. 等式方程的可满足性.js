// 连通性问题，==的时候将两个字符链接，遍历链接完，再遍历判断!=的情况，看不等式两边字符是否联通，联通则false
var equationsPossible = function(equations) {
  const unionSet = new UnionSet(26)

  for (let i = 0; i < equations.length; i++) {
    const symbol = equations[i][1]
    const firstChar = equations[i][0]
    const lastChar = equations[i][3]

    if (symbol === '=') {
      unionSet.merge(getCartCodeIndex(firstChar), getCartCodeIndex(lastChar))
    }
  }

  for (let i = 0; i < equations.length; i++) {
    const symbol = equations[i][1]
    const firstChar = equations[i][0]
    const lastChar = equations[i][3]

    if (symbol === '!' && 
    unionSet.find(getCartCodeIndex(firstChar)) === unionSet.find(getCartCodeIndex(lastChar))
    ) {
      return false
    }
  }
  return true
};

function getCartCodeIndex(char) {
  return char.charCodeAt() - 96
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