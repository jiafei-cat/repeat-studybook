// 使用并查集获取单独岛的个数
// 思路: 将二维的坐标用数字编号将其转为一维，遍历数组，当前为1的岛屿连接其上下左右为1的岛屿(其实只要连接左上即可)
//      最后获取有多少不同的连通的岛屿
var numIslands = function(grid) {
  let n = grid.length
  let m = grid[0].length
  // 将二维坐标转为一维数字编号
  const unionSet = new UnionSet(n * m)
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      // 为0的岛屿不需要连接
      if (grid[i][j] === '0') continue
      // 到这里只有岛屿为1的岛屿
      // 将当前岛屿与左边为1的岛屿连接
      if (i > 0 && grid[i-1][j] === '1') {
        unionSet.merge(getIndex(i, j, m), getIndex(i - 1, j, m))
      }
      // 将当前岛屿与上边为1的岛屿连接
      if (j > 0 && grid[i][j-1] === '1') {
        unionSet.merge(getIndex(i, j, m), getIndex(i, j-1, m))
      }
    }
  }
  let result = 0
  // 获取不同岛屿个数
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      // 当前岛屿为1，且当前并查集中的当前坐标编号为同一个连通
      if (grid[i][j] === '1' && unionSet.find(getIndex(i, j, m)) === getIndex(i, j, m)) {
        result++
      }
    }
  }

  return result
};

// 更具i,j坐标和宽度获取当前一维数字编号
function getIndex (i, j, m) {
  return (i * m) + j
}

class UnionSet {
  constructor(length) {
    this.father = Array.from({ length }, (_, index) => index)
  }
  find(index) {
    let curVal = this.father[index]
    return this.father[index] = curVal === index ? index : this.find(curVal)
  }
  merge(a, b) {
    this.father[this.find(a)] = this.find(b)
  }
}