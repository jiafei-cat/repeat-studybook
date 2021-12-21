var kthGrammar = function(n, k) {
  if (n === 1) {
    return 0
  }

  const n1 = Math.pow(2, n - 1) // 计算第n行长度
  const isLeft = k <= n1 / 2

  // 每次递归都会判断是否在左边
  if (isLeft) {
    return kthGrammar(n - 1, k)
  } else {
    // 如果在右边，那么下次查找的位置减少一半
    let val = kthGrammar(n - 1, k - n1 / 2)
    // 结果需要翻转，因为是镜像关系
    return val === 0 ? 1 : 0
  }

};