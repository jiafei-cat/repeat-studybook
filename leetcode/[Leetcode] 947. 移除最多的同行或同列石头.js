/**
 * 思路:
 * 在一行或者一竖的可以看作是联通的，联通的去掉石子只要一个一个去掉剩一个就行，
 * 所以问题变成了，有多少种不联通的石子，石头总数减去不联通石子类别数量就是多余联通数量，也就是题解
 */
var removeStones = function(stones) {
  const unionSet = new UnionSet(stones.length)
  const mapX = {} // 记录同一行下标关系，方便联通
  const mapY = {} // 记录同一列下标关系，方便联通

  // 遍历联通石子下标关系
  for(let i = 0; i < stones.length; i++) {
    let x = stones[i][0]
    let y = stones[i][1]
    if (mapX[x] !== undefined) {
      unionSet.merge(i, mapX[x])
    }
    if (mapY[y] !== undefined) {
      unionSet.merge(i, mapY[y])
    }
    mapX[x] = i
    mapY[y] = i
  }

  // 计算有多少种不联通的
  let typeCount = 0
  for(let i = 0; i < stones.length; i++) {
    if (unionSet.find(i) === i) {
      typeCount++
    }
  }

  // 石子总数减去不联通既是多余联通的
  return stones.length - typeCount
};

class UnionSet {
  constructor(length) {
    this.father = Array.from({ length }, (_, i) => i)
    this.count = Array.from({ length}, () => 1)
  }
  find(index) {
    let curVal = this.father[index]
    return this.father[index] = curVal === index ? index : this.find(curVal)
  }
  merge(a, b) {
    let curA = this.find(a)
    let curB = this.find(b)
    if (curA === curB) {
      return
    }

    this.father[curA] = curB
    this.count[curB] += this.count[curA]
  }
}